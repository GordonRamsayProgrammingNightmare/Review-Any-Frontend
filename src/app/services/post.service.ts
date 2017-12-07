import { Injectable } from '@angular/core';
import { Promise } from 'q';
import { Http, Headers } from '@angular/http';
import { Post } from '../models/post';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PostService {
  private BASE_URL: string = 'http://localhost:3000/api';

  public newPostSubject = new Subject<any>();

  constructor(
    private http: Http
  ) {
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  searchHandler(searchData) {
    searchData.image = 'default-image';
    this.newPostSubject.next(searchData);
  }

}
