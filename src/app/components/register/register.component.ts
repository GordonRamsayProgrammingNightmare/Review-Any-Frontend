import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = new User();

  constructor(
    private auth: AuthService,
    private locate: Location,
    private route: Router

  ) {}

  onRegister(): void {
    this.auth.register(this.user)
    .then((user) => {
      console.log(user.json());
      this.route.navigateByUrl('login');
    })
    .catch((err) => {
      console.log(err);
    });
  }

  goBack(): void {
    this.locate.back();
  }
}
