import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UsersService} from '../../api/services/users.service';
import {UserData} from '../../api/models/user-data';
import {Title} from '@angular/platform-browser';
import {EventsService} from '../../services/events.service';

@Component({
  selector: 'bnl-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  userData: UserData;

  constructor(private route: ActivatedRoute,
              private userService: UsersService,
              private eventsService: EventsService,
              private title: Title) {
  }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('user_id');
    this.loadUserData(userId);
    this.route.params.subscribe(params => {
      const routeUserId = params.user_id;
      this.loadUserData(routeUserId);
    });
  }

  loadUserData(userId: string) {
    this.userService.usersDataUserIdGet({user_id: userId}).subscribe(data => {
      this.userData = data;
      this.title.setTitle(`BNL | Archive de ${this.userData.pokename} ${this.userData.adjective}`);
    });
  }

  userImgUrl(): string {
    return `assets/images/pokemon/big/${this.userData.img_id}.png`
  }

}
