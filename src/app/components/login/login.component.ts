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
  error: string;

  constructor(private router: Router, private auth: AuthService, ) {}

  directToRegister(): void {
    this.router.navigate(['register']);
  }

  onLogin(): void {
    this.auth.login(this.user)
    .then((msg) => {
      localStorage.setItem('token', msg.json().token);
			console.log(msg.json());
			this.router.navigateByUrl('/');
    })
    .catch((err) => {
      alert("Undefined username or password");
    });
  }
}
