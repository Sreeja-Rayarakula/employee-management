# Employee Management

ASP.NET Core Web API and Angular application for managing employees. The API uses SQL Server, Entity Framework Core migrations, JWT authentication, and Admin/User role authorization.

## Local setup

1. Copy `EmployeeAPI/appsettings.Development.example.json` to `EmployeeAPI/appsettings.Development.json` and replace the sample secrets.
2. Update `DefaultConnection` in `EmployeeAPI/appsettings.json` if SQL Server Express is not available as `.\\SQLEXPRESS`.
3. Apply the database migration with `dotnet ef database update --project EmployeeAPI`.
4. Start the API with `dotnet run --project EmployeeAPI`.
5. Install frontend dependencies with `npm --prefix employee-ui install`.
6. Start Angular with `npm --prefix employee-ui start`.

The API runs at `http://localhost:5015` and Angular at `http://localhost:4200`.