using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TricountBackend.Models
{
    public class Repayment
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public Guid TricountId { get; set; }

        public required Tricount Tricount { get; set; }

        [Required]
        public Guid FromId { get; set; }

        public required Participant From { get; set; }

        [Required]
        public Guid ToId { get; set; }

        public required Participant To { get; set; }

        [Required]
        public decimal Amount { get; set; }

        public bool Completed { get; set; } = false;

        public DateTime? CompletedAt { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}