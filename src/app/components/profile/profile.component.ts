import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { intro } from './intro';
import { list } from './list';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  LIST = list;

  constructor() { }

  ngOnInit() {

  }

}
