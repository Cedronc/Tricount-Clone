using System;
using System.Collections.Generic;

namespace TricountBackend.DTOs
{
    public record ExpenseDTO(
        Guid Id,
        Guid TricountId,
        string Description,
        decimal Amount,
        string OriginalCurrency,
        decimal? ExchangeRate,
        Guid PaidById,
        DateTime CreatedAt,
        List<ExpenseSplitDTO> Splits
    );

    public record ExpenseSplitDTO(
        Guid ParticipantId,
        decimal Amount
    );

    public record CreateExpenseDTO(
        string Description,
        decimal Amount,
        string OriginalCurrency,
        Guid PaidById,
        List<Guid>? ParticipantIds,
        List<ExpenseSplitDTO>? CustomSplits
    );

    public record UpdateExpenseDTO(
        string Description,
        decimal Amount,
        Guid PaidById,
        List<Guid>? ParticipantIds,
        List<ExpenseSplitDTO>? CustomSplits
    );
}