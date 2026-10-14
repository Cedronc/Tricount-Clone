using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TricountBackend.Models
{
    public class User
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public required string UserId { get; set; } // Clerk User ID

        [Required]
        public required string Name { get; set; }

        public List<Tricount> Tricounts { get; set; } = new List<Tricount>();
    }
}
