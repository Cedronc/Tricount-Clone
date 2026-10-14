using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TricountBackend.Models
{
    public class ExpenseSplit
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public Guid ExpenseId { get; set; }

        public Expense Expense { get; set; }

        [Required]
        public Guid ParticipantId { get; set; }

        public Participant Participant { get; set; }

        [Required]
        public decimal Amount { get; set; }
    }
}