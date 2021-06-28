import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../api/services/users.service';
import {UserData} from '../../api/models/user-data';

@Component({
  selector: 'bnl-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  usersData: UserData[];

  constructor(private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.usersService.usersDataAllGet().subscribe( (data) => {
      this.usersData = data;
    });
  }

  userImgUrl(imgId: string): string {
    return `assets/images/pokemon/medium/${imgId}.gif`;
  }

}
