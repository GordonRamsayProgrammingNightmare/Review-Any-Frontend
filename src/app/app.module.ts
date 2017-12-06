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
import { UploadService } from './services/upload.service';
import { CrudDataService } from './services/crud-data.service';

import { TabComponent } from './components/profile/tab/tab.component';
import { MaterialModule } from 'app/material/material.module';
import { SearchComponent } from './components/search/search.component';

import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { SortingComponent } from './components/sorting/sorting.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AuthidComponent,
    HomeComponent,
    ProfileComponent,
    UploadComponent,
    NavbarComponent,
    TabComponent,
    SearchComponent,
    SortingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule,
    Ng4LoadingSpinnerModule
  ],
  providers: [
    AuthService,
		EnsureAuthenticatedService,
    LoginRedirectService,
    UploadService,
    CrudDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
