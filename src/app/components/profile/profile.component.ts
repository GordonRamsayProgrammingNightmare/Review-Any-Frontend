import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { list } from './list';
import { AuthidComponent } from 'app/components/authid/authid.component';
import { AuthService } from 'app/services/auth.service';
import { User } from '../../models/user';
import { UploadService } from '../../services/upload.service';
import { CrudDataService } from '../../services/crud-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [User],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  LIST = list;
  user: User = new User();
  username: string;
  saySomething:string;
  profileImg: any;
  likepostNum: any;
  mypostNum: any;

  constructor(
    private userData: CrudDataService,
    private upload: UploadService
  ) { }

  ngOnInit() {
    this.userData.getData(localStorage.getItem('token'), 'user')
      .then((data) => {
        console.log("user: ", data.json());
        this.user.username = data.json().username;
        this.user.saySomething = data.json().saySomething;        
        this.user.profileImg = data.json().profileImg;
        this.likepostNum = data.json().likePost.length;
        this.mypostNum = data.json().myPost.length;
      })
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.profileImg = this.user.profileImg = reader.result;
      }
    };
  }

  submitChange() {
    alert('save change clicked');
  }
}
