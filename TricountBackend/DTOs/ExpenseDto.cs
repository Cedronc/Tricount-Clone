using System;
using System.Collections.Generic;

namespace TricountBackend.DTOs
{
    public record ExpenseDto(
        Guid Id,
        Guid TricountId,
        string Description,
        decimal Amount,
        string OriginalCurrency,
        decimal? ExchangeRate,
        Guid PaidById,
        DateTime CreatedAt,
        List<ExpenseSplitDto> Splits
    );

    public record ExpenseSplitDto(
        Guid ParticipantId,
        decimal Amount
    );

    public record CreateExpenseDto(
        string Description,
        decimal Amount,
        string OriginalCurrency,
        Guid PaidById,
        List<Guid>? ParticipantIds,
        List<ExpenseSplitDto>? CustomSplits
    );

    public record UpdateExpenseDto(
        string Description,
        decimal Amount,
        Guid PaidById,
        List<Guid>? ParticipantIds,
        List<ExpenseSplitDto>? CustomSplits
    );
}