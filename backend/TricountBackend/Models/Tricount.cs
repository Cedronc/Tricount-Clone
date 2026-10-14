using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TricountBackend.Models
{
    public class Tricount
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public string Name { get; set; }

        [Required]
        public string Currency { get; set; } = "EUR";

        public bool Archived { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public List<Participant> Participants { get; set; } = new List<Participant>();

        public List<Expense> Expenses { get; set; } = new List<Expense>();
    }
}