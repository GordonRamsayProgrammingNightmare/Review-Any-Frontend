import { Injectable, OnInit } from '@angular/core';
import { Http, HttpHeaders } from '@angular/http';

import { Post } from '../models/post';

import "rxjs/add/operator/do";
//import the map function to be used with the http library
import "rxjs/add/operator/map";
import { Headers } from 'ng2-file-upload/ng2-file-upload';

@Injectable()
export class UploadService implements OnInit {
  private BASE_URL: string = 'http://localhost:3000/api';


  ngOnInit() {
  }

  constructor(
    private http: Http
  ) { }

  uploadPost(post: Post): Promise<any> {
    let url: string = `${this.BASE_URL}/post`;
    const token = localStorage.getItem('token');
    return this.http.post(url, post, {
      headers: new HttpHeaders().set(['Content-Type', 'application/json'], ['x-access-token', `${token}`])
    }).toPromise();
  }

}
