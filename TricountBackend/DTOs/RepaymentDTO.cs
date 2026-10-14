using System;
using System.Collections.Generic;

namespace TricountBackend.DTOs
{
    public record RepaymentSuggestionDTO(
        Guid FromId,
        Guid ToId,
        decimal Amount
    );

    public record CreateRepaymentDTO(
        Guid FromId,
        Guid ToId,
        decimal Amount
    );

    public record RepaymentDTO(
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