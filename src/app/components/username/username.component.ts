import {Component, Input, OnInit} from '@angular/core';
import {UserData} from '../../api/models/user-data';

@Component({
  selector: 'bnl-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss']
})
export class UsernameComponent implements OnInit {
  @Input() userData: UserData;

  constructor() {
  }

  ngOnInit() {
  }

}
