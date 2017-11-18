import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router/';
import { Post } from '../../models/post';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UploadComponent implements OnInit {
  post: Post;
  postImg: string;
  loading: boolean = false;


  constructor(
    private router: Router,
    private uploader: UploadService
  ) {
  }

  ngOnInit() {

  }

  onUpload() {
    this.uploader.uploadPost(this.post)
    .then((msg) => {
      console.log(msg.json());
      alert(msg.json().message);
      this.router.navigateByUrl('/');
    })
    .catch((err) => {
      alert(err.json().message);
    })
  }

  onFileChange(event) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.postImg = reader.result;
     }
    };
  }

  gotoHome(): void {
    this.router.navigate(['home']);
  }

  clearFile(){

  }
}
