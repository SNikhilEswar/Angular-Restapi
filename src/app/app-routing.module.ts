import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './testing/auth/auth.component';
import { AuthGuard } from './testing/auth/auth.guard';
import { ChangeComponent } from './testing/change/change.component';
import { DashboardComponent } from './testing/dashboard/dashboard.component';
import { EmployeeComponent } from './testing/employee/employee.component';
import { ForgotComponent } from './testing/forgot/forgot.component';
import { MenuComponent } from './testing/menu/menu.component';
import { ProfileComponent } from './testing/profile/profile.component';

const routes: Routes = [
  {path: '', component: AuthComponent},
  {path: 'dasboard', canActivate:[AuthGuard], component: DashboardComponent},
  {path: 'dasboard/:id', component: EmployeeComponent},
  {path: 'profile', canActivate:[AuthGuard], component: ProfileComponent},
  {path: 'change', canActivate:[AuthGuard], component:ChangeComponent },
  {path: 'forgot', component: ForgotComponent},
  {path: 'menu', component: MenuComponent},
  {path: '**', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
