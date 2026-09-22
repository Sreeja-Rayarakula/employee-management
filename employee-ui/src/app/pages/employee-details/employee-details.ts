import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-employee-details',
  styleUrl: './employee-details.css',
  templateUrl: './employee-details.html',
})
export class EmployeeDetails implements OnInit {
  employee = signal<Employee | null>(null);
  notFound = signal(false);

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isInteger(id)) {
      this.notFound.set(true);
      return;
    }

    this.employeeService.getEmployeeById(id).subscribe({
      next: employee => this.employee.set(employee),
      error: () => this.notFound.set(true)
    });
  }
}
