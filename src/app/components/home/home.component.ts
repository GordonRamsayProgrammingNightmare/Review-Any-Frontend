import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'app/services/auth.service';
import { GetDataService } from 'app/services/get-data.service';
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

  constructor(
    private router: Router,
    private getData: GetDataService
  ) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit() {
    this.updateData();
    this.interval = setInterval(() => {
      this.updateData();
      console.log('interval over');
    }, 5000);
  }

  updateData() {
    // console.log('token: \n', localStorage.getItem('token'));
    this.getData.getData(this.token, 'post/all')
    .then((data) => {
      // console.log(data.json().posts);
      var p = [];
      data.json().posts.forEach(element => {
        p.push(element);
      });
      // console.log(p);
      this.posts = p;

    }).catch((err) => {
      console.log('error: \n' + err);
    });
  }

  viewHandler(postId): void {
    this.getData.sendData(this.token, 'post/view', postId)
      .then((msg) => {
        // console.log(msg.json());
      })
      .catch(err => {
        console.log(err);
      });
  }

  likeBtnHandler(postId): void {
    // console.log(localStorage.getItem('token'));
    // console.log(postId);
    this.getData.getData(this.token, 'user')
      .then(data => {
        var arr = data.json().likePost;
        var a: boolean = false;
        arr.forEach(element => {
          if(postId == element) { a = true; }
        });
        if (!a) {
          this.getData.sendData(this.token, 'post/like', postId)
          .then((msg) => {
            // console.log(msg.json());
          })
          .catch(err => {
            console.log(err);
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}


// export const Post2 = [
//     {
//       title: 'sea',
//       content: 'seaseaseasea seasea sea seaseaseasea seaseaseasea seaseaseasea',
//       picUrl: 'https://signoftherose.files.wordpress.com/2016/08/sea-05.jpg',
//       tags: ['sea', 'apple', 'haha', 'hoho'],
//       writtenBy: 'harry',
//       writtenAt: '2001/11/11',
//       likeCnt: '6',
//       viewCnt: '15'
//     },

//     {
//       title: 'iphone',
//       content: 'iphone iphone iphone iphone iphone iphoneiphone iphone iphoneiphoneiphoneiphoneiphoneiphoneiphone',
//       picUrl: 'https://timedotcom.files.wordpress.com/2017/09/iphone-x.jpg?quality=85',
//       tags: ['phone', 'apple', 'haha', 'hoho'],
//       writtenBy: 'potter',
//       writtenAt: '2012/11/11',
//       likeCnt: '6',
//       viewCnt: '15'
//     },

//     {
//       title: 'begin',
//       content: 'beginbeginbeginbeginbegin beginbeginbeginbegin beginbegin beginbegin beginbeginbegin',
//       picUrl: 'http://cfile22.uf.tistory.com/image/246D8A385603F235273E26',
//       tags: ['begin', 'apple', 'haha', 'hoho'],
//       writtenBy: 'joy',
//       writtenAt: '2013/11/11',
//       likeCnt: '6',
//       viewCnt: '15'
//     },

//     {
//       title: 'x-mas',
//       content: 'x-masx-mas x-masx-mas x-masx-masx-masx-masx-mas x-masx-mas',
//       picUrl: 'http://t1.daumcdn.net/liveboard/slidee/448dd4e09cea48a2b48cb3d24345fb06.jpeg',
//       tags: ['x-mas', 'apple', 'haha', 'hoho'],
//       writtenBy: 'kate',
//       writtenAt: '2014/11/11',
//       likeCnt: '6',
//       viewCnt: '15'
//     },

//     {
//       title: 'jong',
//       content: 'jongjongjongjongjongjongjongjongvvjongjongjong jongjongjongjong jongjongjongjongjong jongjongjongjong',
//       picUrl: 'https://pbs.twimg.com/profile_images/800622153565540352/hki9xSrp.jpg',
//       tags: ['jong', 'apple', 'haha', 'hoho'],
//       writtenBy: 'junsu',
//       writtenAt: '2015/11/11',
//       likeCnt: '6',
//       viewCnt: '15'
//     }
// ];


