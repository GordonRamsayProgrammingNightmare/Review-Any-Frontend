import { Component, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router/';
import { Post } from '../../models/post';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  providers: [Post],
  encapsulation: ViewEncapsulation.None
})
export class UploadComponent implements OnInit {
  post: Post;
  postImg: string;
  loading: boolean = false;
  inputTags: string;
  private imageUrl: String = 'http://www.washaweb.com/tutoriaux/fileupload/imgs/image-temp-220.png';

  constructor(
    private router: Router,
    private uploader: UploadService
  ) {
  }
  ngOnChanges(changes: SimpleChanges) {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

  }

  ngOnInit() {
  }

  splitTag(): string[] {
    let tagsArray = this.inputTags.split("#");
    return tagsArray;
  }

  onUpload() {
    alert(this.inputTags);
    console.log(this.splitTag());
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

  onFileChange(event: any) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = (e) => {
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
