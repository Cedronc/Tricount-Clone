using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TricountBackend.DTOs
{
    public record UserDTO(
        Guid Id,
        string ClerkUserId,
        string Name,
        List<Guid> TricountIds
    );

    public record CreateUserDTO(
        [Required]
        string ClerkUserId,
        
        [Required]
        string Name
    );

    public record UpdateUserDTO(
        [Required]
        string Name
    );
}