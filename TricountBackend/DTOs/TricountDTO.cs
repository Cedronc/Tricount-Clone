using System;
using System.Collections.Generic;

namespace TricountBackend.DTOs
{
    public record TricountDTO(
        Guid Id,
        string Name,
        string Currency,
        bool Archived,
        DateTime CreatedAt,
        List<Guid> UserIds
    );

    public record CreateTricountDTO(
        string Name,
        string Currency,
        List<Guid> UserIds
    );

    public record UpdateTricountDTO(
        string Name,
        string Currency
    );
}