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
using TricountBackend.DTOs;
using TricountBackend.Models;
using TricountBackend.Services;

namespace TricountBackend.Controllers
{
    [ApiController]
    [Route("tricounts/{tricountId}/repayments")]
    [Authorize]
    [Produces("application/json")]
    [Consumes("application/json")]
    public class RepaymentController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly RepaymentService _repaymentService;

        public RepaymentController(AppDbContext db, RepaymentService repaymentService)
        {
            _db = db;
            _repaymentService = repaymentService;
        }

        /// <summary>
        /// Get repayment suggestions for a tricount.
        /// </summary>
        /// <param name="tricountId">Tricount ID.</param>
        /// <returns>List of repayment suggestions.</returns>
        [HttpGet("suggestions")]
        [ProducesResponseType(typeof(List<RepaymentSuggestionDTO>), 200)]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<List<RepaymentSuggestionDTO>>> GetRepaymentSuggestions(Guid tricountId)
        {
            var userId = User.FindFirstValue("sub");
            var tricount = await _db.Tricounts
                .Include(t => t.Users)
                .FirstOrDefaultAsync(t => t.Id == tricountId && !t.Archived);

            if (tricount == null)
                return NotFound();

            if (!tricount.Users.Any(u => u.UserId == userId))
                return Forbid();

            var suggestions = await _repaymentService.GetRepaymentSuggestionsAsync(tricountId);
            return Ok(suggestions);
        }

        /// <summary>
        /// Record a repayment.
        /// </summary>
        /// <param name="tricountId">Tricount ID.</param>
        /// <param name="dto">Repayment details.</param>
        /// <returns>Created repayment.</returns>
        [HttpPost]
        [ProducesResponseType(typeof(RepaymentDTO), 201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<RepaymentDTO>> CreateRepayment(Guid tricountId, [FromBody] CreateRepaymentDTO dto)
        {
            var userId = User.FindFirstValue("sub");
            var tricount = await _db.Tricounts
                .Include(t => t.Users)
                .FirstOrDefaultAsync(t => t.Id == tricountId && !t.Archived);

            if (tricount == null)
                return NotFound();

            if (!tricount.Users.Any(u => u.UserId == userId))
                return Forbid();

            if (!tricount.Users.Any(u => u.Id == dto.FromId) || !tricount.Users.Any(u => u.Id == dto.ToId))
                return BadRequest("FromId or ToId is not a participant in the tricount.");

            var existingRepayment = await _db.Repayments
                .AnyAsync(r => r.TricountId == tricountId && r.FromId == dto.FromId && r.ToId == dto.ToId && r.Amount == dto.Amount && !r.Completed);

            if (existingRepayment)
                return BadRequest("A similar repayment already exists.");

            var repayment = await _repaymentService.CreateRepaymentAsync(tricountId, dto.FromId, dto.ToId, dto.Amount);

            var repaymentDto = new RepaymentDTO(
                repayment.Id,
                repayment.TricountId,
                repayment.FromId,
                repayment.ToId,
                repayment.Amount,
                repayment.Completed,
                repayment.CompletedAt,
                repayment.CreatedAt
            );

            return CreatedAtAction(nameof(GetRepayment), new { id = repayment.Id }, repaymentDto);
        }

        /// <summary>
        /// Mark a repayment as completed.
        /// </summary>
        /// <param name="id">Repayment ID.</param>
        /// <returns>Updated repayment.</returns>
        [HttpPut("~/repayments/{id}/complete")]
        [ProducesResponseType(typeof(RepaymentDTO), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<RepaymentDTO>> MarkRepaymentAsCompleted(Guid id)
        {
            var userId = User.FindFirstValue("sub");
            var repayment = await _db.Repayments
                .Include(r => r.Tricount)
                .ThenInclude(t => t.Users)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (repayment == null)
                return NotFound();

            if (!repayment.Tricount.Users.Any(u => u.UserId == userId))
                return Forbid();

            var success = await _repaymentService.MarkRepaymentAsCompletedAsync(id);
            if (!success)
                return BadRequest("Repayment is already completed.");

            var repaymentDto = new RepaymentDTO(
                repayment.Id,
                repayment.TricountId,
                repayment.FromId,
                repayment.ToId,
                repayment.Amount,
                repayment.Completed,
                repayment.CompletedAt,
                repayment.CreatedAt
            );

            return Ok(repaymentDto);
        }

        /// <summary>
        /// Get a repayment by ID.
        /// </summary>
        /// <param name="id">Repayment ID.</param>
        /// <returns>Repayment details.</returns>
        [HttpGet("~/repayments/{id}")]
        [ProducesResponseType(typeof(RepaymentDTO), 200)]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<RepaymentDTO>> GetRepayment(Guid id)
        {
            var userId = User.FindFirstValue("sub");
            var repayment = await _db.Repayments
                .Include(r => r.Tricount)
                .ThenInclude(t => t.Users)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (repayment == null)
                return NotFound();

            if (!repayment.Tricount.Users.Any(u => u.UserId == userId))
                return Forbid();

            var repaymentDto = new RepaymentDTO(
                repayment.Id,
                repayment.TricountId,
                repayment.FromId,
                repayment.ToId,
                repayment.Amount,
                repayment.Completed,
                repayment.CompletedAt,
                repayment.CreatedAt
            );

            return Ok(repaymentDto);
        }
    }
}