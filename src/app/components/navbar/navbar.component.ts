import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
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
