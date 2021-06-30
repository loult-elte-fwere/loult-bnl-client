import {Component, Input, OnInit} from '@angular/core';
import {UserData} from '../../../api/models/user-data';

@Component({
  selector: 'bnl-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss']
})
export class UsernameComponent implements OnInit {
  @Input() userData: UserData;
  @Input() showPopOver = true;

  constructor() {
  }

  ngOnInit() {
  }

  getColor() {
    return 'color : ' + this.userData.color;
  }

  getImg() {
    return 'assets/images/pokemon/small/' + this.userData.img_id + '.gif';
  }

}
