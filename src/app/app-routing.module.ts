import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { auth } from 'firebase';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AuthGuard } from './auth.guard';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ContactusComponent } from './contactus/contactus.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';
import { HomeComponent } from './home/home.component';
import { MainformComponent } from './mainform/mainform.component';
import { PlacementsComponent } from './placements/placements.component';
import { RegisterComponent } from './register/register.component';
import { StudentloginComponent } from './studentlogin/studentlogin.component';
import { UpdatesComponent } from './updates/updates.component';

const routes: Routes =
[
  {
    path:'home',
    component: HomeComponent
  },
  {
    path: 'aboutus',
    component: AboutusComponent
  },
  {
    path: 'contactus',
    component: ContactusComponent
  },
  {
    path: 'placements',
    component: PlacementsComponent
  },
  {
    path: 'updates',
    component: UpdatesComponent
  },
  {
    path: 'studentlogin',
    component: StudentloginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'forgotpassword',
    component: ForgotpassComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'mainform',
    component: MainformComponent
  },
  {
    path: 'changepassword',
    component: ChangepasswordComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
