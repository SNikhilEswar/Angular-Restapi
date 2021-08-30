import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './testing/header/header.component';
import { DashboardComponent } from './testing/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EmployeeComponent } from './testing/employee/employee.component';
import { AuthComponent } from './testing/auth/auth.component';
import { AuthInterceptor } from './modules/auth.intercepter';
import { ProfileComponent } from './testing/profile/profile.component';
import { ChangeComponent } from './testing/change/change.component';
import { ForgotComponent } from './testing/forgot/forgot.component';
import { MenuComponent } from './testing/menu/menu.component';
import { SidebarModule } from 'ng-sidebar';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    EmployeeComponent,
    AuthComponent,
    ProfileComponent,
    ChangeComponent,
    ForgotComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SidebarModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
