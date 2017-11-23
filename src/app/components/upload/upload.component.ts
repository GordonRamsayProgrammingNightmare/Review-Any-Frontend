import { Component, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router/';
import { Post, Tag } from '../../models/post';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { UploadService } from '../../services/upload.service';
import { element } from 'protractor';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  providers: [Post],
  encapsulation: ViewEncapsulation.None
})
export class UploadComponent implements OnInit {
  post: Post = new Post();
  postImg: any;
  loading: boolean = false;
  inputTags: string;
  private imageUrl: String = 'http://www.washaweb.com/tutoriaux/fileupload/imgs/image-temp-220.png';

  constructor(
    private router: Router,
    private uploader: UploadService
  ) {
    this.postImg = "http://www.washaweb.com/tutoriaux/fileupload/imgs/image-temp-220.png";
  }
  ngOnChanges(changes: SimpleChanges) {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

  }

  ngOnInit() {
  }

//tag split
  splitTag(): string[] {
    let tempArray = this.inputTags.split("#");
    var tagsArray = [];
    var array = {};
    var c=0;
    for(var i=0;i<tempArray.length;i++){
      if((tempArray[i])!=""){  //remove empty element
        array['tag'] = tempArray[i].replace(/\s/gi,"");   //remove empty space
        tagsArray.push(array);
        c++;
      }

    }
    console.log(tagsArray);
    return tagsArray;
  }

  onUpload() {
    // console.log(this.post.tags);
    this.post.tags = this.splitTag();
    this.post.base64 = this.postImg;
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
