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
  public titleClick = new Subject<any>();
  public sortingSubject = new Subject<any>();
  public navreloadSubject = new Subject<any>();

  constructor(
    private http: Http
  ) {
  }

  searchHandler(searchData) {
    this.newPostSubject.next(searchData);
  }

  redirectHandler() {
    this.titleClick.next();
  }

  sortingHandler(sorttype) {
    this.sortingSubject.next(sorttype);
  }

  navReloadHandler() {
    this.navreloadSubject.next();
  }

}
