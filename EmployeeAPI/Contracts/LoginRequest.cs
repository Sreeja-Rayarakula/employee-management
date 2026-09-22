using System.ComponentModel.DataAnnotations;

namespace EmployeeAPI.Contracts;

/// <summary>Credentials used to authenticate with the Employee API.</summary>
public sealed record LoginRequest
{
    [Required]
    public required string Username { get; init; }

    [Required]
    public required string Password { get; init; }
}