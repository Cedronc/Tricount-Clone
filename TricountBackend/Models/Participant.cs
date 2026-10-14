using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TricountBackend.Models
{
    public class Participant
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public required string UserId { get; set; } // Clerk User ID

        [Required]
        public required string Name { get; set; }

        [Required]
        public Guid TricountId { get; set; }

        public required Tricount Tricount { get; set; }
    }
}