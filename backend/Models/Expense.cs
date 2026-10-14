using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TricountBackend.Models
{
    public class Expense
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public Guid TricountId { get; set; }

        public Tricount Tricount { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public string OriginalCurrency { get; set; } = "EUR";

        public decimal? ExchangeRate { get; set; }

        [Required]
        public Guid PaidById { get; set; }

        public Participant PaidBy { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public List<ExpenseSplit> Splits { get; set; } = new List<ExpenseSplit>();
    }
}