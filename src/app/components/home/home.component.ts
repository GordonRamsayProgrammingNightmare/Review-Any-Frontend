import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'app/services/auth.service';
import { CrudDataService } from 'app/services/crud-data.service';
import { Post2 } from 'app/models/post';
import { forEach } from '@angular/router/src/utils/collection';
import { setInterval } from 'timers';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
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
  public postUsername: any;

  constructor(
    private router: Router,
    private crudData: CrudDataService
  ) {
    this.token = localStorage.getItem('token');
    this.getUserLikePost();
  }

  ngOnChanges() {
    this.getUserLikePost();
  }

  ngOnInit() {
    this.getUserLikePost();
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
        // console.log(element.writtenAt);
        element.writtenAt = element.writtenAt.slice(0, element.writtenAt.indexOf('.'));
        element.writtenAt = element.writtenAt.replace('T', ' ');
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
    this.crudData.getData(this.token, `user/username/${post.writtenBy}`)
      .then(data => {
        console.log(data.json());
        this.postUsername = data.json().username;
      })
      .catch(err => {
        console.log(err);
      })
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
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  // 좋아요 목록 refresh
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

  // 한 포스트 좋아요 했는지 체크
  chkLiked(id): boolean {
    // this.getUserLikePost();
    var isLike: boolean = false;
    this.likePosts.forEach(element => {
      if(id == element) {
        isLike = true;
      }
    });
    return isLike;
  }

  likeBtnHandler(postId, post): void {
    // console.log(this.chkLiked(postId));
    // console.log(post.isLiked);
    if(!this.chkLiked(postId) && !post.isLiked) {
      post.isLiked = true;
      post.likeCnt += 1;
      // console.log(post.likeCnt);
      // 포스트 좋아요 db에 반영
      this.crudData.sendData(this.token, 'post/like', postId)
      .then((msg) => {
        this.getUserLikePost();
        console.log(msg.json());
      })
      .catch(err => {
        console.log(err);
      });
    }
    if (this.chkLiked(postId) && post.isLiked) {
      post.isLiked = false;
      post.likeCnt -= 1;
      console.log(post.likeCnt);
      // 포스트 좋아요 취소 db에 반영
      this.crudData.deleteData(this.token, 'post/like', postId)
      .then((msg) => {
        this.getUserLikePost();
        console.log(msg.json());
      })
      .catch(err => {
        console.log(err);
      });
    }
  }
}
