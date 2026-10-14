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

namespace TricountBackend.Controllers
{
    [ApiController]
    [Route("tricounts")]
    [Authorize]
    [Produces("application/json")]
    [Consumes("application/json")]
    public class TricountController : ControllerBase
    {
        private readonly AppDbContext _db;

        public TricountController(AppDbContext db)
        {
            _db = db;
        }

        /// <summary>
        /// List all tricounts for the current user.
        /// </summary>
        /// <returns>List of tricounts.</returns>
        [HttpGet]
        [ProducesResponseType(typeof(List<TricountDTO>), 200)]
        public async Task<ActionResult<List<TricountDTO>>> GetTricounts()
        {
            var userId = User.FindFirstValue("sub");
            var tricounts = await _db.Tricounts
                .Include(t => t.Users)
                .Where(t => t.Users.Any(u => u.UserId == userId) && !t.Archived)
                .Select(t => new TricountDTO(
                    t.Id,
                    t.Name,
                    t.Currency,
                    t.Archived,
                    t.CreatedAt,
                    t.Users.Select(u => u.Id).ToList()
                ))
                .ToListAsync();

            return Ok(tricounts);
        }

        /// <summary>
        /// Get a tricount by ID.
        /// </summary>
        /// <param name="id">Tricount ID.</param>
        /// <returns>Tricount details.</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(TricountDTO), 200)]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<TricountDTO>> GetTricount(Guid id)
        {
            var userId = User.FindFirstValue("sub");
            var tricount = await _db.Tricounts
                .Include(t => t.Users)
                .FirstOrDefaultAsync(t => t.Id == id && !t.Archived);

            if (tricount == null)
                return NotFound();

            if (!tricount.Users.Any(u => u.UserId == userId))
                return Forbid();

            var dto = new TricountDTO(
                tricount.Id,
                tricount.Name,
                tricount.Currency,
                tricount.Archived,
                tricount.CreatedAt,
                tricount.Users.Select(u => u.Id).ToList()
            );

            return Ok(dto);
        }

        /// <summary>
        /// Create a new tricount.
        /// </summary>
        /// <param name="dto">Tricount details.</param>
        /// <returns>Created tricount.</returns>
        [HttpPost]
        [ProducesResponseType(typeof(TricountDTO), 201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<TricountDTO>> CreateTricount([FromBody] CreateTricountDTO dto)
        {
            var userId = User.FindFirstValue("sub");
            var currentUser = await _db.Users.FirstOrDefaultAsync(u => u.UserId == userId);

            if (currentUser == null)
            {
                currentUser = new User { UserId = userId, Name = User.FindFirstValue("name") ?? "Unknown" };
                _db.Users.Add(currentUser);
            }

            var userIds = dto.UserIds ?? new List<Guid>();
            var users = await _db.Users.Where(u => userIds.Contains(u.Id)).ToListAsync();
            users.Add(currentUser);

            var tricount = new Tricount
            {
                Name = dto.Name,
                Currency = dto.Currency,
                Users = users.Distinct().ToList()
            };

            _db.Tricounts.Add(tricount);
            await _db.SaveChangesAsync();

            var responseDto = new TricountDTO(
                tricount.Id,
                tricount.Name,
                tricount.Currency,
                tricount.Archived,
                tricount.CreatedAt,
                tricount.Users.Select(u => u.Id).ToList()
            );

            return CreatedAtAction(nameof(GetTricount), new { id = tricount.Id }, responseDto);
        }

        /// <summary>
        /// Update a tricount.
        /// </summary>
        /// <param name="id">Tricount ID.</param>
        /// <param name="dto">Updated tricount details.</param>
        /// <returns>Updated tricount.</returns>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(TricountDTO), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<TricountDTO>> UpdateTricount(Guid id, [FromBody] UpdateTricountDTO dto)
        {
            var userId = User.FindFirstValue("sub");
            var tricount = await _db.Tricounts
                .Include(t => t.Users)
                .FirstOrDefaultAsync(t => t.Id == id && !t.Archived);

            if (tricount == null)
                return NotFound();

            if (!tricount.Users.Any(u => u.UserId == userId))
                return Forbid();

            tricount.Name = dto.Name;
            tricount.Currency = dto.Currency;

            await _db.SaveChangesAsync();

            var responseDto = new TricountDTO(
                tricount.Id,
                tricount.Name,
                tricount.Currency,
                tricount.Archived,
                tricount.CreatedAt,
                tricount.Users.Select(u => u.Id).ToList()
            );

            return Ok(responseDto);
        }

        /// <summary>
        /// Archive a tricount (soft delete).
        /// </summary>
        /// <param name="id">Tricount ID.</param>
        /// <returns>No content.</returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> ArchiveTricount(Guid id)
        {
            var userId = User.FindFirstValue("sub");
            var tricount = await _db.Tricounts
                .Include(t => t.Users)
                .FirstOrDefaultAsync(t => t.Id == id && !t.Archived);

            if (tricount == null)
                return NotFound();

            if (!tricount.Users.Any(u => u.UserId == userId))
                return Forbid();

            tricount.Archived = true;
            await _db.SaveChangesAsync();

            return NoContent();
        }

        /// <summary>
        /// Add a user to a tricount.
        /// </summary>
        /// <param name="id">Tricount ID.</param>
        /// <param name="userId">User ID to add.</param>
        /// <returns>Updated tricount.</returns>
        [HttpPost("{id}/users")]
        [ProducesResponseType(typeof(TricountDTO), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<TricountDTO>> AddUserToTricount(Guid id, [FromBody] Guid userId)
        {
            var currentUserId = User.FindFirstValue("sub");
            var tricount = await _db.Tricounts
                .Include(t => t.Users)
                .FirstOrDefaultAsync(t => t.Id == id && !t.Archived);

            if (tricount == null)
                return NotFound();

            if (!tricount.Users.Any(u => u.UserId == currentUserId))
                return Forbid();

            var user = await _db.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null)
                return BadRequest("User not found.");

            if (!tricount.Users.Any(u => u.Id == userId))
                tricount.Users.Add(user);

            await _db.SaveChangesAsync();

            var responseDto = new TricountDTO(
                tricount.Id,
                tricount.Name,
                tricount.Currency,
                tricount.Archived,
                tricount.CreatedAt,
                tricount.Users.Select(u => u.Id).ToList()
            );

            return Ok(responseDto);
        }

        /// <summary>
        /// Remove a user from a tricount.
        /// </summary>
        /// <param name="id">Tricount ID.</param>
        /// <param name="userId">User ID to remove.</param>
        /// <returns>Updated tricount.</returns>
        [HttpDelete("{id}/users/{userId}")]
        [ProducesResponseType(typeof(TricountDTO), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<TricountDTO>> RemoveUserFromTricount(Guid id, Guid userId)
        {
            var currentUserId = User.FindFirstValue("sub");
            var tricount = await _db.Tricounts
                .Include(t => t.Users)
                .FirstOrDefaultAsync(t => t.Id == id && !t.Archived);

            if (tricount == null)
                return NotFound();

            if (!tricount.Users.Any(u => u.UserId == currentUserId))
                return Forbid();

            var user = tricount.Users.FirstOrDefault(u => u.Id == userId);
            if (user == null)
                return BadRequest("User not found in tricount.");

            tricount.Users.Remove(user);
            await _db.SaveChangesAsync();

            var responseDto = new TricountDTO(
                tricount.Id,
                tricount.Name,
                tricount.Currency,
                tricount.Archived,
                tricount.CreatedAt,
                tricount.Users.Select(u => u.Id).ToList()
            );

            return Ok(responseDto);
        }
    }
}