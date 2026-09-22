import { Routes } from '@angular/router';


import { EmployeeList } from './pages/employee-list/employee-list';
import { AddEmployee } from './pages/add-employee/add-employee';
import { EmployeeDetails } from './pages/employee-details/employee-details';
import { Login } from './pages/login/login';
import { authGuard } from './auth/auth.guard';
import { adminGuard } from './auth/admin.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'employees',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'employees',
    component: EmployeeList,
    canActivate: [authGuard]
  },
  {
    path: 'add-employee',
    component: AddEmployee,
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'edit-employee/:id',
    component: AddEmployee,
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'employees/:id',
    component: EmployeeDetails,
    canActivate: [authGuard]
  }
];