import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from '../../api/services/users.service';
import {UserData} from '../../api/models/user-data';
import {Title} from '@angular/platform-browser';
import {EventsService} from '../../services/events.service';
import {RoleProvider} from '../../services/role-provider';
import {AdminService} from '../../api/services/admin.service';
import {UserLibraryFilters} from "../../api/models/user-library-filters";

@Component({
  selector: 'bnl-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  userData: UserData;
  userFilters = {
    query_archived_by_others: false,
    query_archived_by_user: true,
    query_submissions: false
  } as UserLibraryFilters;

  constructor(private route: ActivatedRoute,
              private userService: UsersService,
              private eventsService: EventsService,
              private adminService: AdminService,
              public roleProvider: RoleProvider,
              private router: Router,
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

  userIsTrash() {
    const roles = Object.keys(this.userData.roles);
    return roles.length === 1 && roles[0] === 'TRASH';
  }


  showRestoreButton() {
    return (this.roleProvider.isLoggedIn()
      && this.roleProvider.userData.permissions.can_trash_users
      && this.userIsTrash());
  }

  showTrashButton() {
    return (this.roleProvider.isLoggedIn()
      && this.roleProvider.userData.permissions.can_trash_users
      && !this.userIsTrash());

  }

  deleteUser() {
    this.adminService.adminDeleteUserDelete({body: {user_id: this.userData.userid}}).subscribe(
      () => {
        this.router.navigate(['/last']);
      }
    );
  }

  trashUser() {
    this.adminService.adminTrashUserPost({
        body: {
          user_id: this.userData.userid,
          trashed: true
        }
      }
    ).subscribe(
      (userData) => this.userData = userData
    );
  }

  restoreUser() {
    this.adminService.adminTrashUserPost({
        body: {
          user_id: this.userData.userid,
          trashed: false
        }
      }
    ).subscribe(
      (userData) => this.userData = userData
    );
  }

  userImgUrl(): string {
    return `assets/images/pokemon/big/${this.userData.img_id}.png`;
  }

  signalFilteringChange() {
    this.eventsService.refreshWall.emit();
  }

}
