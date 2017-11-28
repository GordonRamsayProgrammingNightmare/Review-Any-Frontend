import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'app/services/auth.service';
import { GetDataService } from 'app/services/get-data.service';
import { Post2 } from 'app/models/post';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {
  private token: any;
  public posts: Array<any>;

  constructor(
    private router: Router,
    private getData: GetDataService
  ) {
    this.token = localStorage.getItem('token');
   }

  ngOnInit() {
    this.getData.getData(this.token, 'post/all')
    .then((data) => {
      var p = [];
      data.json().posts.forEach(element => {
        p.push(element);
      });
      this.posts = p;

    }).catch((err) => {
      console.log('error: \n' + err);
    });
  }

  viewHandler(postId): void {
    this.getData.sendData(this.token, 'post/view', postId)
      .then((msg) => {
      })
      .catch(err => {
        console.log(err);
      });
  }

  likeBtnHandler(postId): void {
    this.getData.sendData(this.token, 'post/like', postId)
      .then((msg) => {
      })
      .catch(err => {
        console.log(err);
      });
  }

}
