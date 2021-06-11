import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UsersService} from '../../api/services/users.service';
import {UserData} from '../../api/models/user-data';

@Component({
  selector: 'bnl-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  userData: UserData;

  constructor(private route: ActivatedRoute,
              private userService: UsersService) {
  }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('user_id');
    this.loadUserData(userId);
    this.route.params.subscribe(params => {
      const userId = params.user_id;
      this.loadUserData(userId);
    });
  }

  loadUserData(userId: string) {
    this.userService.usersDataUserIdGet({user_id: userId}).subscribe(data => {
      this.userData = data;
    });
  }

  userImgUrl(): string {
    return `assets/images/pokemon/big/${this.userData.img_id}.png`
  }

}
