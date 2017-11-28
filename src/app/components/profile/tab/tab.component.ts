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
  public likedPosts: Array<any>;
  likedPostExists: boolean;
  likedPostNotExists: boolean;

  constructor(
    private router: Router,
    private getData: GetDataService
  ) {
    this.token = localStorage.getItem('token');
    this.likedPostExists = false;
    this.likedPostNotExists = true;
   }

  ngOnInit() {
    this.getData.getData(this.token, 'post')
    .then((data) => {
      var p = [];
      data.json().posts.forEach(element => {
        p.push(element);
      });
      this.posts = p;

    }).catch((err) => {
      console.log('error: \n' + err);
    });
    this.getData.getData(this.token, 'post/like')
      .then((data) => {
        var lp = [];
        data.json().posts.forEach(element => {
          lp.push(element);
        });
        this.likedPosts = lp;
        if(lp) {
          this.likedPostExists = true;
          this.likedPostNotExists = false;
        }
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
