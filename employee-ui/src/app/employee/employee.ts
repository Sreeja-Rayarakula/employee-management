import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './employee.html',
  styleUrl: './employee.css'
})
export class EmployeeComponent implements OnInit {

  employees = signal<Employee[]>([]);

  searchText = '';
  message = signal('');
  appliedSearchText = '';

  employeePendingDelete = signal<Employee | null>(null);
  private messageTimer?: ReturnType<typeof setTimeout>;

  constructor(
    private employeeService: EmployeeService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService
      .getEmployees()
      .subscribe(data => {
        this.employees.set(data);
      });
  }

  getFilteredEmployees(): Employee[] {
    return this.employees().filter(employee =>
      employee.name
        .toLowerCase()
        .includes(this.appliedSearchText.toLowerCase())
    );
  }

  searchEmployees(): void {
    this.appliedSearchText = this.searchText.trim();
  }

  clearSearch(): void {
    this.searchText = '';
    this.appliedSearchText = '';
  }

  requestDelete(employee: Employee): void {
    this.employeePendingDelete.set(employee);
  }

  cancelDelete(): void {
    this.employeePendingDelete.set(null);
  }

  confirmDelete(): void {
    const employee = this.employeePendingDelete();

    if (!employee) {
      return;
    }

    this.employeeService
      .deleteEmployee(employee.id)
      .subscribe(() => {
        this.employees.update(employees =>
          employees.filter(item => item.id !== employee.id));
        this.employeePendingDelete.set(null);

        this.showMessage('Employee Deleted Successfully');
      });
  }

  dismissMessage(): void {
    this.message.set('');
  }

  private showMessage(message: string): void {
    clearTimeout(this.messageTimer);
    this.message.set(message);
    this.messageTimer = setTimeout(() => this.message.set(''), 3000);
  }
}
