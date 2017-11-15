import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = new User();

  constructor(private router: Router, private auth: AuthService, ) {}

  directToRegister(): void {
    this.router.navigate(['register']);
  }

  onLogin(): void {
    this.auth.login(this.user)
    .then((user) => {
      localStorage.setItem('token', user.json().token);
			console.log(user.json());
			this.router.navigateByUrl('/');
    })
    .catch((err) => {
      console.log(err);
    });
  }
}
