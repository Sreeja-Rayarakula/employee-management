using EmployeeAPI.Models;

namespace EmployeeAPI.Interfaces;

public interface IEmployeeService
{
   Task<List<Employee>> GetAll();

Task<Employee?> GetById(int id);

Task Add(Employee employee);

Task<Employee?> Update(int id, Employee updatedEmployee);

Task<bool> Delete(int id);
}