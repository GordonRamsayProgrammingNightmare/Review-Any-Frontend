import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { list } from './list';
import { AuthidComponent } from 'app/components/authid/authid.component';
import { AuthService } from 'app/services/auth.service';
import { User } from '../../models/user';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  LIST = list;
  user: User = new User();
  username: string;
  profileImg: any;


  constructor(
    private userData: AuthService,
    private upload: UploadService
  ) { }

  ngOnInit() {
    this.userData.getUserData(localStorage.getItem('token'))
      .then((data) => {
        console.log(data.json());
        this.user.username = data.json().username;
        this.user.profileImg = data.json().profileImg;
      })
  }

  submitChange() {
    alert('save change clicked');
  }
}
