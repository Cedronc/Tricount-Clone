using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TricountBackend.Models
{
    public class Tricount
    {
        public Tricount()
        {
            Users = new List<User>();
            Expenses = new List<Expense>();
        }

        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public required string Name { get; set; }

        [Required]
        public string Currency { get; set; } = "EUR";

        public bool Archived { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public List<User> Users { get; set; }

        public List<Expense> Expenses { get; set; }
    }
}
