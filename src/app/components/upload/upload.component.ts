import { Component, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router/';
import { Post, Tag } from '../../models/post';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { UploadService } from '../../services/upload.service';
import { element } from 'protractor';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

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
    private uploader: UploadService,
    private spinnerService: Ng4LoadingSpinnerService
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
    var c = 0;
    for(var i = 0; i < tempArray.length; i++) {
      if((tempArray[i])!=""){  //remove empty element
        // remove empty space
        tagsArray[c] = this.conTag(tempArray[i].replace(/\s/gi,""));
        c++;
      }
    }
    // console.log(tagsArray);
    return tagsArray;
  }

  conTag(input): any {
    return {'tag': input};
  }

  onUpload() {
    // console.log(this.post.tags);
    this.post.tags = this.splitTag();
    this.spinnerService.show();
    // this.post.base64 = this.postImg;
    console.log(this.post);
    this.uploader.uploadPost(this.post)
    .then((msg) => {
      // console.log(msg.json());
      this.spinnerService.hide();
      // alert("Uploaded file successfully");
      this.router.navigateByUrl('/');
    })
    .catch((err) => {
      // alert(err.json().message);
      console.log('not uploaded');
    })
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.postImg = this.post.base64 = reader.result;
        // console.log(reader.result);
      }
    };
  }

  gotoHome(): void {
    this.router.navigate(['home']);
  }

  clearFile(){

  }
}
