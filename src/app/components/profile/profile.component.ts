import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { list } from './list';
import { AuthidComponent } from 'app/components/authid/authid.component';
import { AuthService } from 'app/services/auth.service';
import { User } from '../../models/user';
import { UploadService } from '../../services/upload.service';
import { GetDataService } from '../../services/get-data.service';

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
    private userData: GetDataService,
    private upload: UploadService
  ) { }

  ngOnInit() {
    this.userData.getData(localStorage.getItem('token'), 'user')
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
