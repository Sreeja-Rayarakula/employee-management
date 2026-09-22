using EmployeeAPI.Data;
using EmployeeAPI.Interfaces;
using EmployeeAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeAPI.Services;

public class EmployeeService : IEmployeeService
{
    private readonly ApplicationDbContext _context;

    public EmployeeService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Employee>> GetAll()
    {
        return await _context.Employees.ToListAsync();
    }

    public async Task<Employee?> GetById(int id)
    {
        return await _context.Employees
            .FirstOrDefaultAsync(e => e.Id == id);
    }

    public async Task Add(Employee employee)
    {
        _context.Employees.Add(employee);

        await _context.SaveChangesAsync();
    }

    public async Task<Employee?> Update(int id, Employee updatedEmployee)
    {
        var employee = await _context.Employees
            .FirstOrDefaultAsync(e => e.Id == id);

        if (employee == null)
        {
            return null;
        }

        employee.Name = updatedEmployee.Name;
        employee.Department = updatedEmployee.Department;
        employee.Email = updatedEmployee.Email;

        await _context.SaveChangesAsync();

        return employee;
    }

    public async Task<bool> Delete(int id)
    {
        var employee = await _context.Employees
            .FirstOrDefaultAsync(e => e.Id == id);

        if (employee == null)
        {
            return false;
        }

        _context.Employees.Remove(employee);

        await _context.SaveChangesAsync();

        return true;
    }
}