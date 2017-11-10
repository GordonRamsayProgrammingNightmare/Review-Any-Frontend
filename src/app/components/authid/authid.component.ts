import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { EnsureAuthenticated } from '../../services/ensure-authenticated.service';

@Component({
  selector: 'authid',
  templateUrl: './authid.component.html',
  styleUrls: ['./authid.component.css']
})
export class AuthidComponent implements OnInit {
  loginInfo: string;
  constructor(private auth: AuthService) {}
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.auth.ensureAuthenticated(token)
      .then((post) => {
        console.log(post.json());
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
}
