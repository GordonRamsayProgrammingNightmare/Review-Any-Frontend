import { Injectable } from '@angular/core';
import { Promise } from 'q';
import { HomeComponent } from '../components/home/home.component';
// import { HomeComponent } from 'app/components/home/home.component';

@Injectable()
export class SearchService {
  private searchType: string;
  private searchTxt: string;
  private home: HomeComponent;
  constructor(
  ) { }

  searchByType(posts) {
    this.home.posts = posts;
  }

  chkLiked(id) {
    return this.home.chkLiked(id);
  }
}
