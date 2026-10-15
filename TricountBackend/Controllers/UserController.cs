using System;
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
    [Route("users")]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _db;

        public UserController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet("me")]
        public async Task<ActionResult<UserDTO>> GetCurrentUser()
        {
            var clerkUserId = User.FindFirstValue("sub");
            if (string.IsNullOrEmpty(clerkUserId))
            {
                return Unauthorized();
            }

            var user = await _db.Users
                .Include(u => u.Tricounts)
                .FirstOrDefaultAsync(u => u.UserId == clerkUserId);

            if (user == null)
            {
                return NotFound();
            }

            return new UserDTO(
                user.Id,
                user.UserId,
                user.Name,
                user.Tricounts.Select(t => t.Id).ToList()
            );
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult<UserDTO>> SyncUserFromClerk([FromBody] CreateUserDTO dto)
        {
            if (string.IsNullOrEmpty(dto.ClerkUserId) || string.IsNullOrEmpty(dto.Name))
            {
                return BadRequest();
            }

            var existingUser = await _db.Users.FirstOrDefaultAsync(u => u.UserId == dto.ClerkUserId);
            if (existingUser != null)
            {
                existingUser.Name = dto.Name;
                _db.Users.Update(existingUser);
            }
            else
            {
                var newUser = new User
                {
                    UserId = dto.ClerkUserId,
                    Name = dto.Name
                };
                _db.Users.Add(newUser);
            }

            await _db.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDTO>> GetUser(Guid id)
        {
            var clerkUserId = User.FindFirstValue("sub");
            if (string.IsNullOrEmpty(clerkUserId))
            {
                return Unauthorized();
            }

            var user = await _db.Users
                .Include(u => u.Tricounts)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                return NotFound();
            }

            if (user.UserId != clerkUserId)
            {
                return Forbid();
            }

            return new UserDTO(
                user.Id,
                user.UserId,
                user.Name,
                user.Tricounts.Select(t => t.Id).ToList()
            );
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<UserDTO>> UpdateUser(Guid id, [FromBody] UpdateUserDTO dto)
        {
            var clerkUserId = User.FindFirstValue("sub");
            if (string.IsNullOrEmpty(clerkUserId))
            {
                return Unauthorized();
            }

            var user = await _db.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            if (user.UserId != clerkUserId)
            {
                return Forbid();
            }

            user.Name = dto.Name;
            _db.Users.Update(user);
            await _db.SaveChangesAsync();

            return new UserDTO(
                user.Id,
                user.UserId,
                user.Name,
                user.Tricounts.Select(t => t.Id).ToList()
            );
        }
    }
}
