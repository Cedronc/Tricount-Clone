using System;
using System.Collections.Generic;

namespace TricountBackend.DTOs
{
    public record RepaymentSuggestionDto(
        Guid FromId,
        Guid ToId,
        decimal Amount
    );

    public record CreateRepaymentDto(
        Guid FromId,
        Guid ToId,
        decimal Amount
    );

    public record RepaymentDto(
        Guid Id,
        Guid TricountId,
        Guid FromId,
        Guid ToId,
        decimal Amount,
        bool Completed,
        DateTime? CompletedAt,
        DateTime CreatedAt
    );
}