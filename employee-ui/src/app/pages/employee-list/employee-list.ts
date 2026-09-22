import { Component } from '@angular/core';
import { EmployeeComponent } from '../../employee/employee';

@Component({
  imports: [EmployeeComponent],
  selector: 'app-employee-list',
  styleUrl: './employee-list.css',
  templateUrl: './employee-list.html',
})
export class EmployeeList {}
