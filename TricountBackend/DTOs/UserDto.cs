using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TricountBackend.DTOs
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string ClerkUserId { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public List<Guid> TricountIds { get; set; } = new List<Guid>();
    }

    public class CreateUserDto
    {
        [Required]
        public string ClerkUserId { get; set; } = string.Empty;
        
        [Required]
        public string Name { get; set; } = string.Empty;
    }

    public class UpdateUserDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;
    }
}