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
  @Input() textSize: 'small' | 'medium' = 'small';

  constructor() {
  }

  ngOnInit() {
  }

  fontSize() {
    return this.textSize === 'small' ? '0.6rem' : '0.8rem';
  }

  getImg() {
    return 'assets/images/pokemon/small/' + this.userData.img_id + '.gif';
  }

}
