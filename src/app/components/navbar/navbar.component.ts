import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { CrudDataService } from 'app/services/crud-data.service';
// import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {
  selectedList: string;
  searchType: string;
  searchTxt: string;
  username: string;
  profileImg: string;
  token: any;

  constructor(
    private router: Router,
    private auth: AuthService,
    private crud: CrudDataService,
    // private search: SearchService
  ) {
    this.token = localStorage.getItem('token');
    this.searchType = 'Search';
    this.crud.getData(this.token, 'user')
    .then(data => {
      this.username = data.json().username;
      this.profileImg = data.json().profileImg;
    })
    .catch(err => {
      console.log('error: ', err);
    });
  }

  ngOnInit() {

  }

  ngOnChanges() {

  }

  selectList(data: string): void {
    this.searchType = data;
  }

  gotoHome(): void {
    this.router.navigate(['']);
  }

  gotoProfile(): void {
    this.router.navigate(['profile']);
  }

  gotoUpload(): void {
    this.router.navigate(['upload']);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('login');
  }

  searchHandler(): void {

  }

  // searchHandler(): void {
  //   this.crud.getData(this.token, 'search/' + this.searchType + '/' + this.searchTxt)
  //     .then(data => {
  //       var p = [];
  //       console.log(data.json());
  //       data.json().post.forEach(element => {
  //         if(this.search.chkLiked(element._id)) {
  //           element.isLiked = true;
  //           // console.log(element);
  //         } else {
  //           element.isLiked = false;
  //         }

  //         // console.log(element.writtenAt);
  //         element.writtenAt = element.writtenAt.slice(0, element.writtenAt.indexOf('.'));
  //         element.writtenAt = element.writtenAt.replace('T', ' ');
  //         p.push(element);
  //       });
  //       // console.log(p);
  //       this.search.searchByType(p);
  //     }).catch((err) => {
  //       console.log('error: \n' + err);
  //     });
  // }
}

