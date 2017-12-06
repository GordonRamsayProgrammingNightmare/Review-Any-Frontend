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
  public posts: Array<any>;
  public likedPosts: Array<any>;
  likedPostExists: boolean;
  likedPostNotExists: boolean;
  rerender = false;

  constructor(
    private router: Router,
    private crud: CrudDataService,
    private cdr: ChangeDetectorRef
  ) {
    this.token = localStorage.getItem('token');
    this.likedPostExists = false;
    this.likedPostNotExists = true;
  }

  doRerender() {
    this.rerender = true;
    this.cdr.detectChanges();
    this.rerender = false;
  }

  ngOnInit() {
    this.crud.getData(this.token, 'post')
    .then((data) => {
      var p = [];
      data.json().posts.forEach(element => {
        element.writtenAt = element.writtenAt.slice(0, element.writtenAt.indexOf('.'));
        element.writtenAt = element.writtenAt.replace('T', ' ');
        p.push(element);
      });
      this.posts = p;

    }).catch((err) => {
      console.log('error: \n' + err);
    });
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

  viewHandler(postId): void {
    this.crud.sendData(this.token, 'post/view', postId)
      .then((msg) => {
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

  editBtnHandler(): void {

  }
}
