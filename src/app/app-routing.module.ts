import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthidComponent } from './components/authid/authid.component';
import { HomeComponent } from 'app/components/home/home.component';

import { AuthService } from './services/auth.service';
import { EnsureAuthenticatedService } from './services/ensure-authenticated.service';
import { LoginRedirectService } from './services/login-redirect.service';
import { ProfileComponent } from 'app/components/profile/profile.component';
import { UploadComponent } from 'app/components/upload/upload.component';


const appRouter: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginRedirectService]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoginRedirectService]
  },
  {
    path: 'auth',
    component: AuthidComponent,
    canActivate: [EnsureAuthenticatedService]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [EnsureAuthenticatedService]
  },
  {
    path: 'upload',
    component: UploadComponent,
    canActivate: [EnsureAuthenticatedService]
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [EnsureAuthenticatedService]
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRouter)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
