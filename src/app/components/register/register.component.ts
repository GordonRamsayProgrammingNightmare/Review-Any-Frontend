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
  private userImg: String;
  private imageUrl: String = 'http://cfile7.uf.tistory.com/image/99AFF23359AF9A05212542';

  constructor(
    private auth: AuthService,
    private locate: Location,
    private route: Router

  ) {}

  onRegister(): void {
    this.auth.register(this.user)
    .then((user) => {
      alert(user.json().message );
      this.route.navigateByUrl('login');
    })
    .catch((err) => {
      alert(err.json().message);
      console.log(err);
    });
  }

  onChangeEvent(event: any) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.user.profileImg = reader.result;
        // hehe
        this.imageUrl = e.target.result;
      }
    };
  }

  goBack(): void {
    this.locate.back();
  }
}
