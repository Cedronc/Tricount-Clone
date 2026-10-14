using Microsoft.EntityFrameworkCore;
using TricountBackend.Models;

namespace TricountBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            Tricounts = Set<Tricount>();
            Users = Set<User>();
            Expenses = Set<Expense>();
            ExpenseSplits = Set<ExpenseSplit>();
            Repayments = Set<Repayment>();
        }

        public DbSet<Tricount> Tricounts { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Expense> Expenses { get; set; }
        public DbSet<ExpenseSplit> ExpenseSplits { get; set; }
        public DbSet<Repayment> Repayments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Tricount>()
                .HasMany(t => t.Users)
                .WithMany(u => u.Tricounts);

            modelBuilder.Entity<Tricount>()
                .HasMany(t => t.Expenses)
                .WithOne(e => e.Tricount)
                .HasForeignKey(e => e.TricountId);

            modelBuilder.Entity<Expense>()
                .HasOne(e => e.PaidBy)
                .WithMany()
                .HasForeignKey(e => e.PaidById);

            modelBuilder.Entity<Expense>()
                .HasMany(e => e.Splits)
                .WithOne(s => s.Expense)
                .HasForeignKey(s => s.ExpenseId);

            modelBuilder.Entity<ExpenseSplit>()
                .HasOne(s => s.User)
                .WithMany()
                .HasForeignKey(s => s.ParticipantId);

            modelBuilder.Entity<Repayment>()
                .HasOne(r => r.From)
                .WithMany()
                .HasForeignKey(r => r.FromId);

            modelBuilder.Entity<Repayment>()
                .HasOne(r => r.To)
                .WithMany()
                .HasForeignKey(r => r.ToId);
        }
    }
}
