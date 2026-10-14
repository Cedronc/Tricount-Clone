using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TricountBackend.Data;
using TricountBackend.DTOs;
using TricountBackend.DTOs;
using TricountBackend.Models;

namespace TricountBackend.Services
{
    public class RepaymentService
    {
        private readonly AppDbContext _db;

        public RepaymentService(AppDbContext db)
        {
            _db = db;
        }

        public async Task<List<RepaymentSuggestionDTO>> GetRepaymentSuggestionsAsync(Guid tricountId)
        {
            var expenses = await _db.Expenses
                .Include(e => e.Splits)
                .Where(e => e.TricountId == tricountId)
                .ToListAsync();

            var users = await _db.Tricounts
                .Where(t => t.Id == tricountId)
                .SelectMany(t => t.Users)
                .ToListAsync();

            var balances = new Dictionary<Guid, decimal>();

            foreach (var user in users)
            {
                balances[user.Id] = 0;
            }

            foreach (var expense in expenses)
            {
                foreach (var split in expense.Splits)
                {
                    if (!balances.ContainsKey(split.ParticipantId))
                        continue;

                    balances[split.ParticipantId] -= split.Amount;
                }

                if (balances.ContainsKey(expense.PaidById))
                {
                    balances[expense.PaidById] += expense.Amount;
                }
            }

            var debtors = balances.Where(b => b.Value < 0).ToList();
            var creditors = balances.Where(b => b.Value > 0).ToList();

            var suggestions = new List<RepaymentSuggestionDTO>();

            foreach (var debtor in debtors)
            {
                var debtorBalance = -debtor.Value;
                foreach (var creditor in creditors.Where(c => c.Value > 0))
                {
                    if (debtorBalance <= 0)
                        break;

                    var amount = Math.Min(debtorBalance, creditor.Value);
                    if (amount > 0)
                    {
                        suggestions.Add(new RepaymentSuggestionDTO(
                            debtor.Key,
                            creditor.Key,
                            amount
                        ));
                        debtorBalance -= amount;
                        creditors[creditors.IndexOf(creditor)] = new KeyValuePair<Guid, decimal>(creditor.Key, creditor.Value - amount);
                    }
                }
            }

            return suggestions;
        }

        public async Task<Repayment> CreateRepaymentAsync(Guid tricountId, Guid fromId, Guid toId, decimal amount)
        {
            var tricount = await _db.Tricounts.FindAsync(tricountId);
            var fromUser = await _db.Users.FindAsync(fromId);
            var toUser = await _db.Users.FindAsync(toId);

            if (tricount == null || fromUser == null || toUser == null)
                throw new ArgumentException("Invalid tricount or user IDs.");

            var repayment = new Repayment
            {
                TricountId = tricountId,
                Tricount = tricount,
                FromId = fromId,
                From = fromUser,
                ToId = toId,
                To = toUser,
                Amount = amount,
                Completed = false
            };

            _db.Repayments.Add(repayment);
            await _db.SaveChangesAsync();

            return repayment;
        }

        public async Task<bool> MarkRepaymentAsCompletedAsync(Guid repaymentId)
        {
            var repayment = await _db.Repayments.FindAsync(repaymentId);
            if (repayment == null || repayment.Completed)
                return false;

            repayment.Completed = true;
            repayment.CompletedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();

            return true;
        }
    }
}