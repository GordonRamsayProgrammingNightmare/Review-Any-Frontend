import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router/';
import { Post } from '../../models/post';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UploadComponent implements OnInit {


  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  onUpload() {

  }

  gotoHome(): void {
    this.router.navigate(['home']);
  }

}
