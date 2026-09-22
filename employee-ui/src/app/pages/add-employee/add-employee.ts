import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-add-employee',
  styleUrl: './add-employee.css',
  templateUrl: './add-employee.html',
})
export class AddEmployee implements OnInit {
  employee = {
    name: '',
    department: '',
    email: ''
  };

  isSaving = false;
  employeeId: number | null = null;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam === null) {
      return;
    }

    const id = Number(idParam);

    if (!Number.isInteger(id)) {
      return;
    }

    this.employeeId = id;
    this.employeeService.getEmployeeById(id).subscribe(employee => {
      this.employee = {
        name: employee.name,
        department: employee.department,
        email: employee.email
      };
      this.changeDetector.markForCheck();
    });
  }

  saveEmployee(): void {
    this.isSaving = true;

    const request = this.employeeId === null
      ? this.employeeService.addEmployee(this.employee)
      : this.employeeService.updateEmployee(this.employeeId, this.employee);

    request.subscribe({
      next: () => this.router.navigate(['/employees']),
      error: () => {
        this.isSaving = false;
        this.changeDetector.markForCheck();
      }
    });
  }
}
