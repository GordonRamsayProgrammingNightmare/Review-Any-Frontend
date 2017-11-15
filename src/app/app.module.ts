import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthidComponent } from './components/authid/authid.component';
import { HomeComponent } from 'app/components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UploadComponent } from './components/upload/upload.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { AuthService } from './services/auth.service';
import { EnsureAuthenticatedService } from './services/ensure-authenticated.service';
import { LoginRedirectService } from './services/login-redirect.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AuthidComponent,
    HomeComponent,
    ProfileComponent,
    UploadComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [AuthService,
		EnsureAuthenticatedService,
	  LoginRedirectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
