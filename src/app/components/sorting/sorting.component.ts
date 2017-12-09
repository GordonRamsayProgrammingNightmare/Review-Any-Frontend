import { Component, OnInit } from '@angular/core';
import { PostService } from 'app/services/post.service';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css']
})
export class SortingComponent implements OnInit {

  constructor(
    private postservice: PostService
  ) { }

  ngOnInit() {
  }

  sortBy(it) {
    this.postservice.sortingHandler(it);
  }

}
