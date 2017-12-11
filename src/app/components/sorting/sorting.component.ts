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

  toggle1 : boolean = true;
  toggle2 : boolean = false;
  toggle3 : boolean = false;

  sortBy(it) {
    this.postservice.sortingHandler(it);
    if(it==='day'){
      this.toggle1= true;
      this.toggle2= false;
      this.toggle3= false;
    }
    else if(it==='view'){
      this.toggle1= false;
      this.toggle2= true;
      this.toggle3= false;
    }
    else if(it==='like'){
      this.toggle1= false;
      this.toggle2= false;
      this.toggle3= true;
    }
      
  }

}
