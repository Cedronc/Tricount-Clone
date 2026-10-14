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
        public string UserId { get; set; } // Clerk User ID

        [Required]
        public string Name { get; set; }

        [Required]
        public Guid TricountId { get; set; }

        public Tricount Tricount { get; set; }
    }
}