import { Injectable, OnInit, ElementRef } from '@angular/core';
import { Http } from '@angular/http';

import "rxjs/add/operator/do";
//import the map function to be used with the http library
import "rxjs/add/operator/map";

@Injectable()
export class UploadService implements OnInit {
  private BASE_URL: string = 'http://localhost:3000/api';
  private url: string = `${this.BASE_URL}/post/`;



  ngOnInit() {
  }

  constructor(
    private http: Http,
    private el: ElementRef
  ) { }

}
