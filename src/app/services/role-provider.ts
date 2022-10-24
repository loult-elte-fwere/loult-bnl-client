import {Injectable} from '@angular/core';
import {UserData} from '../api/models/user-data';
import {UsersService} from '../api/services/users.service';
import {EventsService} from './events.service';
import {CookieStorageService} from './cookie-storage.service';


@Injectable({providedIn: 'root'})
export class RoleProvider {
  public userData: UserData;

  constructor(
    private usersService: UsersService,
    private cookieService: CookieStorageService,
    private eventsService: EventsService
  ) {
    this.cookieService.loadCookie();
    if (this.cookieService.userCookie !== undefined) {
      this.login();
    }
  }

  public isLoggedIn(): boolean {
    return this.userData !== undefined;
  }

  public login() {
    this.usersService.usersDataCurrentGet().subscribe(data => {
      this.userData = data;
      this.eventsService.userLogin.emit(this.userData);
    });
  }

  public logout() {
    window.localStorage.clear();
    this.userData = undefined;
    this.eventsService.userLogout.emit();
  }
}
