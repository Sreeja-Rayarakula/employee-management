namespace EmployeeAPI.Contracts;

/// <summary>JWT authentication result returned after a successful login.</summary>
public sealed record LoginResponse(string Token, DateTimeOffset ExpiresAt);