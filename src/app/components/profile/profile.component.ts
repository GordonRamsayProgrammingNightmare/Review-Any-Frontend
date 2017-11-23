import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { list } from './list';
import { AuthidComponent } from 'app/components/authid/authid.component';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  LIST = list;
  username: string;
  profileImg: any;


  constructor(
    private userData: AuthService
  ) { }

  ngOnInit() {
    this.userData.getUserData(localStorage.getItem('token'))
      .then((data) => {
        console.log(data.json().profileImg);
        this.username = data.json().username;
        this.profileImg = data.json().profileImg;
      })
  }
}
