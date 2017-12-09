import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'app/services/auth.service';
import { CrudDataService } from 'app/services/crud-data.service';
import { Post2 } from 'app/models/post';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {
  private token: any;
  public profileposts: Array<any>;
  public likedPosts: Array<any>;
  public postUserName: any;
  likedPostExists: boolean;
  likedPostNotExists: boolean;
  myPostExists : boolean;
  rerender = false;
  edit = false;

  constructor(
    private router: Router,
    private crud: CrudDataService,
    private cdr: ChangeDetectorRef
  ) {
    this.token = localStorage.getItem('token');
    this.likedPostExists = false;
    this.myPostExists=false;
    this.updateMyPosts();
    this.updateLikePosts();
  }

  doRerender() {
    this.rerender = true;
    this.cdr.detectChanges();
    this.rerender = false;
  }

  ngOnInit() {
    this.updateMyPosts();
    this.updateLikePosts();
    console.log(this.profileposts);
  }

  updateMyPosts() {
    this.crud.getData(this.token, 'post')
    .then((data) => {
      var p = [];
      data.json().posts.forEach(element => {
        element.writtenAt = element.writtenAt.slice(0, element.writtenAt.indexOf('.'));
        element.writtenAt = element.writtenAt.replace('T', ' ');
        p.push(element);
      });
      this.profileposts = p;
      if(p){
        this.myPostExists=true;
      }

    }).catch((err) => {
      console.log('error: \n' + err);
    });
  }

  updateLikePosts() {
    this.crud.getData(this.token, 'post/like')
    .then((data) => {
      var lp = [];
      data.json().posts.forEach(element => {
        element.writtenAt = element.writtenAt.slice(0, element.writtenAt.indexOf('.'));
        element.writtenAt = element.writtenAt.replace('T', ' ');
        lp.push(element);
      });
      this.likedPosts = lp;
      if(lp) {
        this.likedPostExists = true;
        this.likedPostNotExists = false;
      }
  });
  }

  viewHandler(postId, post): void {
    this.updateSinglePost(postId);
    this.crud.getData(this.token, `user/username/${post.writtenBy}`)
      .then(data => {
        // console.log(data.json());
        this.postUserName = data.json().username;
      })
      .catch(err => {
        console.log(err);
      });
    this.crud.sendData(this.token, 'post/view', postId)
      .then((msg) => {
        // console.log(msg.json());
      })
      .catch(err => {
        console.log(err);
      });
  }

  updateSinglePost(postId): void {
    this.crud.getData(this.token, `post/one/${postId}`)
      .then(data => {
        // console.log(data.json().post);
        var singlePost = data.json().post;
        this.profileposts.forEach(element => {
          if(element._id == postId) {
            element.viewCnt = singlePost.viewCnt;
            element.likeCnt = singlePost.likeCnt;
            element.comments = singlePost.comments;
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  likeBtnHandler(postId): void {
    this.crud.sendData(this.token, 'post/like', postId)
      .then((msg) => {
      })
      .catch(err => {
        console.log(err);
      });
  }

  delBtnHandler(postId): void {
    this.crud.deleteData(this.token, 'post', postId)
      .then(msg => {
        alert(msg.json().message);
      })
      .catch(err => {
        console.log(err);
      });
  }

  editBtnHandler(id): void {
    console.log(id);
    this.edit = true;
  }

  onEdit() {
    this.edit = false;
  }
}
