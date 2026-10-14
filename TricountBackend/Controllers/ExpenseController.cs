using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TricountBackend.Data;
using TricountBackend.DTOs;
using TricountBackend.Models;
using TricountBackend.Services;

namespace TricountBackend.Controllers
{
    [ApiController]
    [Authorize]
    public class ExpenseController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly CurrencyService _currencyService;

        public ExpenseController(AppDbContext db, CurrencyService currencyService)
        {
            _db = db;
            _currencyService = currencyService;
        }

        [HttpGet("tricounts/{tricountId}/expenses")]
        [ProducesResponseType(typeof(List<ExpenseDto>), 200)]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<List<ExpenseDto>>> GetExpenses(Guid tricountId)
        {
            var userId = User.FindFirstValue("sub") ?? throw new InvalidOperationException("User ID claim not found");
            var tricount = await _db.Tricounts
                .Include(t => t.Users)
                .FirstOrDefaultAsync(t => t.Id == tricountId);

            if (tricount == null)
                return NotFound();

            if (!tricount.Users.Any(u => u.Id == Guid.Parse(userId)))
                return Forbid();

            var expenses = await _db.Expenses
                .Where(e => e.TricountId == tricountId)
                .Include(e => e.Splits)
                .ToListAsync();

            return expenses.Select(e => new ExpenseDto(
                e.Id,
                e.TricountId,
                e.Description,
                e.Amount,
                e.Currency ?? tricount.Currency,
                e.ExchangeRate,
                e.PaidById,
                e.CreatedAt,
                e.Splits.Select(s => new ExpenseSplitDto(s.ParticipantId, s.Amount)).ToList()
            )).ToList();
        }

        [HttpPost("tricounts/{tricountId}/expenses")]
        [ProducesResponseType(typeof(ExpenseDto), 201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<ExpenseDto>> CreateExpense(Guid tricountId, CreateExpenseDto dto)
        {
            var userId = User.FindFirstValue("sub") ?? throw new InvalidOperationException("User ID claim not found");
            var tricount = await _db.Tricounts
                .Include(t => t.Users)
                .FirstOrDefaultAsync(t => t.Id == tricountId);

            if (tricount == null)
                return NotFound();

            if (!tricount.Users.Any(u => u.Id == Guid.Parse(userId)))
                return Forbid();

            if (dto.CustomSplits != null && dto.ParticipantIds != null)
                return BadRequest("Cannot specify both ParticipantIds and CustomSplits");

            if (dto.CustomSplits == null && dto.ParticipantIds == null)
                return BadRequest("Either ParticipantIds or CustomSplits must be provided");



            var splits = new List<ExpenseSplit>();
            if (dto.CustomSplits != null)
            {
                if (dto.CustomSplits.Sum(s => s.Amount) != dto.Amount)
                    return BadRequest("Custom splits sum must equal the total amount");

                splits = dto.CustomSplits.Select(s => new ExpenseSplit
                {
                    ParticipantId = s.ParticipantId,
                    Amount = s.Amount,
                    User = tricount.Users.First(u => u.Id == s.ParticipantId)
                }).ToList();
            }
            else
            {
                var amountPerParticipant = dto.Amount / dto.ParticipantIds.Count;
                splits = dto.ParticipantIds.Select(id => new ExpenseSplit
                {
                    ParticipantId = id,
                    Amount = amountPerParticipant,
                    User = tricount.Users.First(u => u.Id == id)
                }).ToList();
            }

            var exchangeRate = 1m;
            if (dto.OriginalCurrency != tricount.Currency)
                exchangeRate = await _currencyService.GetExchangeRate(dto.OriginalCurrency, tricount.Currency);

            var expense = new Expense
            {
                TricountId = tricountId,
                Tricount = tricount,
                Description = dto.Description,
                Amount = dto.Amount,
                Currency = dto.OriginalCurrency,
                ExchangeRate = exchangeRate,
                PaidById = dto.PaidById,
                PaidBy = tricount.Users.First(u => u.Id == dto.PaidById)
            };

            foreach (var split in splits)
            {
                split.Expense = expense;
                split.ExpenseId = expense.Id;
            }
            expense.Splits = splits;

            _db.Expenses.Add(expense);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetExpense), new { id = expense.Id }, new ExpenseDto(
                expense.Id,
                expense.TricountId,
                expense.Description,
                expense.Amount,
                expense.Currency ?? tricount.Currency,
                expense.ExchangeRate,
                expense.PaidById,
                expense.CreatedAt,
                expense.Splits.Select(s => new ExpenseSplitDto(s.ParticipantId, s.Amount)).ToList()
            ));
        }

        [HttpGet("expenses/{id}")]
        [ProducesResponseType(typeof(ExpenseDto), 200)]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<ExpenseDto>> GetExpense(Guid id)
        {
            var userId = User.FindFirstValue("sub") ?? throw new InvalidOperationException("User ID claim not found");
            var expense = await _db.Expenses
                .Include(e => e.Tricount)
                .ThenInclude(t => t.Users)
                .Include(e => e.Splits)
                .FirstOrDefaultAsync(e => e.Id == id);

            if (expense == null)
                return NotFound();

            if (!expense.Tricount.Users.Any(u => u.Id == Guid.Parse(userId)))
                return Forbid();

            return new ExpenseDto(
                expense.Id,
                expense.TricountId,
                expense.Description,
                expense.Amount,
                expense.Currency ?? expense.Tricount.Currency,
                expense.ExchangeRate,
                expense.PaidById,
                expense.CreatedAt,
                expense.Splits.Select(s => new ExpenseSplitDto(s.ParticipantId, s.Amount)).ToList()
            );
        }

        [HttpPut("expenses/{id}")]
        [ProducesResponseType(typeof(ExpenseDto), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<ExpenseDto>> UpdateExpense(Guid id, UpdateExpenseDto dto)
        {
            var userId = User.FindFirstValue("sub") ?? throw new InvalidOperationException("User ID claim not found");
            var expense = await _db.Expenses
                .Include(e => e.Tricount)
                .ThenInclude(t => t.Users)
                .Include(e => e.Splits)
                .FirstOrDefaultAsync(e => e.Id == id);

            if (expense == null)
                return NotFound();

            if (!expense.Tricount.Users.Any(u => u.Id == Guid.Parse(userId)))
                return Forbid();

            if (dto.CustomSplits != null && dto.ParticipantIds != null)
                return BadRequest("Cannot specify both ParticipantIds and CustomSplits");

            if (dto.CustomSplits == null && dto.ParticipantIds == null)
                return BadRequest("Either ParticipantIds or CustomSplits must be provided");

            var splits = new List<ExpenseSplit>();
            if (dto.CustomSplits != null)
            {
                if (dto.CustomSplits.Sum(s => s.Amount) != dto.Amount)
                    return BadRequest("Custom splits sum must equal the total amount");

                splits = dto.CustomSplits.Select(s => new ExpenseSplit
                {
                    Id = expense.Splits.FirstOrDefault(es => es.ParticipantId == s.ParticipantId)?.Id ?? Guid.NewGuid(),
                    ExpenseId = expense.Id,
                    ParticipantId = s.ParticipantId,
                    Amount = s.Amount,
                    User = expense.Tricount.Users.First(u => u.Id == s.ParticipantId)
                }).ToList();
            }
            else
            {
                var amountPerParticipant = dto.Amount / dto.ParticipantIds.Count;
                splits = dto.ParticipantIds.Select(pid => new ExpenseSplit
                {
                    Id = expense.Splits.FirstOrDefault(es => es.ParticipantId == pid)?.Id ?? Guid.NewGuid(),
                    ExpenseId = expense.Id,
                    ParticipantId = pid,
                    Amount = amountPerParticipant,
                    User = expense.Tricount.Users.First(u => u.Id == pid)
                }).ToList();
            }

            foreach (var split in splits)
            {
                split.Expense = expense;
            }

            expense.Description = dto.Description;
            expense.Amount = dto.Amount;
            expense.PaidById = dto.PaidById;
            expense.Splits = splits;

            await _db.SaveChangesAsync();

            return new ExpenseDto(
                expense.Id,
                expense.TricountId,
                expense.Description,
                expense.Amount,
                expense.Currency ?? expense.Tricount.Currency,
                expense.ExchangeRate,
                expense.PaidById,
                expense.CreatedAt,
                expense.Splits.Select(s => new ExpenseSplitDto(s.ParticipantId, s.Amount)).ToList()
            );
        }

        [HttpDelete("expenses/{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> DeleteExpense(Guid id)
        {
            var userId = User.FindFirstValue("sub") ?? throw new InvalidOperationException("User ID claim not found");
            var expense = await _db.Expenses
                .Include(e => e.Tricount)
                .ThenInclude(t => t.Users)
                .FirstOrDefaultAsync(e => e.Id == id);

            if (expense == null)
                return NotFound();

            if (!expense.Tricount.Users.Any(u => u.Id == Guid.Parse(userId)))
                return Forbid();

            _db.Expenses.Remove(expense);
            await _db.SaveChangesAsync();

            return NoContent();
        }
    }
}