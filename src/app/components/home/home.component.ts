import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'app/services/auth.service';
import { CrudDataService } from 'app/services/crud-data.service';
import { Post2 } from 'app/models/post';
import { forEach } from '@angular/router/src/utils/collection';
import { setInterval } from 'timers';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})


export class HomeComponent implements OnInit {
  private token: any;
  public posts: Array<any>;
  private interval: any;
  private likePosts: Array<any>;

  constructor(
    private router: Router,
    private crudData: CrudDataService
  ) {
    this.token = localStorage.getItem('token');
    this.getUserLikePost();
  }

  ngOnInit() {
    this.updateData();
    // this.interval = setInterval(() => {
    //   this.updateData();
    //   console.log('interval over');
    // }, 5000);
  }

  updateData() {
    this.crudData.getData(this.token, 'post/all')
    .then((data) => {
      // console.log(data.json().posts);
      var p = [];
      data.json().posts.forEach(element => {
        if(this.chkLiked(element._id)) {
          element.isLiked = true;
          // console.log(element);
        } else {
          element.isLiked = false;
        }
        p.push(element);
      });
      // console.log(p);
      this.posts = p;

    }).catch((err) => {
      console.log('error: \n' + err);
    });
  }

  viewHandler(postId, post): void {
    this.updateSinglePost(postId, post);
    this.crudData.sendData(this.token, 'post/view', postId)
      .then((msg) => {
        // console.log(msg.json());
      })
      .catch(err => {
        console.log(err);
      });
  }

  updateSinglePost(postId, post): void {
    this.crudData.getData(this.token, `post/one/${postId}`)
      .then(data => {
        // console.log(data.json().post);
        var singlePost = data.json().post;
        this.posts.forEach(element => {
          if(element._id == postId) {
            element.viewCnt = singlePost.viewCnt;
            element.likeCnt = singlePost.likeCnt;
            // console.log(element.viewCnt);
            // console.log(data.viewCnt);
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getUserLikePost(): any {
    this.crudData.getData(this.token, 'user')
      .then(data => {
        var arr = data.json().likePost;
        this.likePosts = arr;
      })
      .catch(err => {
        console.log(err);
      });
  }

  chkLiked(id): boolean {
    this.getUserLikePost();
    var isLiked: boolean = false;
    this.likePosts.forEach(element => {
      if(id == element) {
        isLiked = true;
      }
    });
    return isLiked;
  }

  likeBtnHandler(postId, post): void {
    console.log(this.chkLiked(postId));
    console.log(post.isLiked);
    if(!this.chkLiked(postId) && !post.isLiked) {
      post.isLiked = true;
      this.crudData.sendData(this.token, 'post/like', postId)
      .then((msg) => {
        console.log(msg.json());
      })
      .catch(err => {
        console.log(err);
      });
    };
    if (this.chkLiked(postId) && post.isLiked) {
      post.isLiked = false;
      this.crudData.deleteData(this.token, 'post/like', postId)
      .then((msg) => {
        console.log(msg.json());
      })
      .catch(err => {
        console.log(err);
      });
    }
  }
}
