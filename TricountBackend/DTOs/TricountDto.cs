using System;
using System.Collections.Generic;

namespace TricountBackend.DTOs
{
    public record TricountDto(
        Guid Id,
        string Name,
        string Currency,
        bool Archived,
        DateTime CreatedAt,
        List<Guid> UserIds
    );

    public record CreateTricountDto(
        string Name,
        string Currency,
        List<Guid> UserIds
    );

    public record UpdateTricountDto(
        string Name,
        string Currency
    );
}