import type { Employee } from '../models/employee';

describe('Employee', () => {
  it('should create', () => {
    const employee = {} as Employee;
    expect(employee).toBeTruthy();
  });
});
