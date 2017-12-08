import { Component, OnInit, ViewEncapsulation, ViewChild, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { CrudDataService } from 'app/services/crud-data.service';
import { PostService } from 'app/services/post.service';
import { HomeComponent } from 'app/components/home/home.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent implements OnInit {
  selectedList: string;
  searchType: string;
  searchTxt: string;
  username: string;
  profileImg: string;
  token: any;

  @Output() onRedirect = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private auth: AuthService,
    private crud: CrudDataService,
    private postservice: PostService
  ) {
    this.token = localStorage.getItem('token');
    this.searchType = 'Title';
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
    this.postservice.redirectHandler();
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
    this.postservice.searchHandler([this.searchType, this.searchTxt]);
  }
}

