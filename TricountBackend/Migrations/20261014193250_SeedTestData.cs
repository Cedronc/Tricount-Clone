using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TricountBackend.Migrations
{
    /// <inheritdoc />
    public partial class SeedTestData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Test Users
            var user1Id = Guid.NewGuid();
            var user2Id = Guid.NewGuid();
            var user3Id = Guid.NewGuid();

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "UserId", "Name" },
                values: new object[,]
                {
                    { user1Id, "dev_user_123", "Alice" },
                    { user2Id, "dev_user_456", "Bob" },
                    { user3Id, "dev_user_789", "Charlie" }
                });

            // Test Tricount
            var tricountId = Guid.NewGuid();
            migrationBuilder.InsertData(
                table: "Tricounts",
                columns: new[] { "Id", "Name", "Currency", "Archived", "CreatedAt" },
                values: new object[]
                {
                    tricountId, "Trip to Paris", "EUR", false, DateTime.UtcNow
                });

            // Link Users to Tricount (N:M)
            migrationBuilder.InsertData(
                table: "TricountUser",
                columns: new[] { "TricountsId", "UsersId" },
                values: new object[,]
                {
                    { tricountId, user1Id },
                    { tricountId, user2Id },
                    { tricountId, user3Id }
                });

            // Test Expenses
            var expense1Id = Guid.NewGuid();
            var expense2Id = Guid.NewGuid();

            migrationBuilder.InsertData(
                table: "Expenses",
                columns: new[] { "Id", "TricountId", "Description", "Amount", "Currency", "ExchangeRate", "PaidById", "CreatedAt" },
                values: new object[,]
                {
                    { expense1Id, tricountId, "Dinner", 90.00m, "EUR", 1.0m, user1Id, DateTime.UtcNow },
                    { expense2Id, tricountId, "Taxi", 30.00m, "EUR", 1.0m, user2Id, DateTime.UtcNow }
                });

            // Test Expense Splits (Equal Split for Dinner: 30 EUR each)
            migrationBuilder.InsertData(
                table: "ExpenseSplits",
                columns: new[] { "Id", "ExpenseId", "ParticipantId", "Amount" },
                values: new object[,]
                {
                    { Guid.NewGuid(), expense1Id, user1Id, 30.00m },
                    { Guid.NewGuid(), expense1Id, user2Id, 30.00m },
                    { Guid.NewGuid(), expense1Id, user3Id, 30.00m }
                });

            // Test Expense Splits (Unequal Split for Taxi: Bob pays 20, Charlie pays 10)
            migrationBuilder.InsertData(
                table: "ExpenseSplits",
                columns: new[] { "Id", "ExpenseId", "ParticipantId", "Amount" },
                values: new object[,]
                {
                    { Guid.NewGuid(), expense2Id, user2Id, 20.00m },
                    { Guid.NewGuid(), expense2Id, user3Id, 10.00m }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Delete Expense Splits
            migrationBuilder.Sql("DELETE FROM \"ExpenseSplits\" WHERE \"ExpenseId\" IN (SELECT \"Id\" FROM \"Expenses\" WHERE \"TricountId\" = (SELECT \"Id\" FROM \"Tricounts\" WHERE \"Name\" = 'Trip to Paris'))");

            // Delete Expenses
            migrationBuilder.Sql("DELETE FROM \"Expenses\" WHERE \"TricountId\" = (SELECT \"Id\" FROM \"Tricounts\" WHERE \"Name\" = 'Trip to Paris')");

            // Delete Tricount-User Links
            migrationBuilder.Sql("DELETE FROM \"TricountUser\" WHERE \"TricountsId\" = (SELECT \"Id\" FROM \"Tricounts\" WHERE \"Name\" = 'Trip to Paris')");

            // Delete Tricount
            migrationBuilder.Sql("DELETE FROM \"Tricounts\" WHERE \"Name\" = 'Trip to Paris'");

            // Delete Users
            migrationBuilder.Sql("DELETE FROM \"Users\" WHERE \"UserId\" LIKE 'dev_user_%'");
        }
    }
}
