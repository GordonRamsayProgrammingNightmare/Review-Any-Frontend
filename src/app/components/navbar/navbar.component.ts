import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {
  selectedList: string;
  searchType: string;

  constructor(
    private router: Router,
    private auth: AuthService
  ) {
    this.searchType = 'Search';
  }

  ngOnInit() {
  }

  ngOnChanges() {

  }

  selectList(data: string): void {
    this.searchType = data;
  }

  gotoHome(): void {
    this.router.navigate(['']);
  }

  gotoProfile(): void {
    this.router.navigate(['profile']);
  }

  gotoUpload(): void {
    this.router.navigate(['upload']);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('login');
  }

}

