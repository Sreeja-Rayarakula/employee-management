using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using EmployeeAPI.Interfaces;
using EmployeeAPI.Models;

namespace EmployeeAPI.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class EmployeeController : ControllerBase
{
    private readonly IEmployeeService _employeeService;

    public EmployeeController(IEmployeeService employeeService)
    {
        _employeeService = employeeService;
    }

    [Authorize(Roles = "Admin,User")]
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var employees = await _employeeService.GetAll();

        return Ok(employees);
    }

    [Authorize(Roles = "Admin,User")]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var employee = await _employeeService.GetById(id);

        if (employee == null)
        {
            return NotFound("Employee not found");
        }

        return Ok(employee);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> AddEmployee(Employee employee)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        await _employeeService.Add(employee);

        return Ok(employee);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateEmployee(
        int id,
        Employee updatedEmployee)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var employee =
            await _employeeService.Update(id, updatedEmployee);

        if (employee == null)
        {
            return NotFound("Employee not found");
        }

        return Ok(employee);
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEmployee(int id)
    {
        var deleted = await _employeeService.Delete(id);

        if (!deleted)
        {
            return NotFound("Employee not found");
        }

        return Ok("Employee deleted successfully");
    }
}