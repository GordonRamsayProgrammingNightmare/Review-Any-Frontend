import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from "@angular/core";
import { list } from "./list";
import { AuthidComponent } from "app/components/authid/authid.component";
import { AuthService } from "app/services/auth.service";
import { User } from "../../models/user";
import { UploadService } from "../../services/upload.service";
import { CrudDataService } from "../../services/crud-data.service";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
  providers: [User],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  LIST = list;
  user: User = new User();
  username: string;
  saySomething: string;
  profileImg: any;
  likepostNum: any;
  mypostNum: any;
  rerender = false;

  constructor(
    private crud: CrudDataService,
    private upload: UploadService,
    private spinnerService: Ng4LoadingSpinnerService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private postservice: PostService


  ) {
  }

  ngOnInit() {
    this.updateData();
  }

  updateData() {
    this.spinnerService.show();
    this.crud.getData(localStorage.getItem("token"), "user")
    .then(data => {
      this.spinnerService.hide();
      console.log("user: ", data.json());
      this.user.username = data.json().username;
      this.user.saySomething = data.json().saySomething;
      this.profileImg = this.user.profileImg = data.json().profileImg;
      this.likepostNum = data.json().likePost.length;
      this.mypostNum = data.json().myPost.length;
    });
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = e => {
        this.profileImg = this.user.base64 = reader.result;
      };
    }
  }

  submitChange() {
    console.log('changing');
    this.spinnerService.show();
    this.crud
      .putData2(localStorage.getItem("token"), "user/update", this.user)
      .then(data => {
        this.spinnerService.hide();
        document.getElementById('closebtn').click();

        // location.reload();
        this.updateData();
        // console.log(data.json());
        this.postservice.navReloadHandler();
      })
      .catch(err => {
        console.log(err);
      });

  }
}
