import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router/';
import { Post } from '../../models/post';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UploadComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;


  constructor(
    private router: Router
  ) {
    // this.createForm();
  }

  ngOnInit() {

  }

  // createForm() {
  //   this.form = this.fb.group({
  //     name: ['', Validators.required],
  //     avatar: null
  //   });
  // }

  onUpload() {

  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('uploadingFile').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        });
      };
    }
  }

  gotoHome(): void {
    this.router.navigate(['home']);
  }

  clearFile(){

  }
}
