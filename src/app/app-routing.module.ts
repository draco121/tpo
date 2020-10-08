import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ContactusComponent } from './contactus/contactus.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';
import { HomeComponent } from './home/home.component';
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
    path: 'student',
    component: DashboardComponent,
    //canActivate: [AuthGuard]
    children: [
      {path:'header',
        component: HeaderComponent}
    ]
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
