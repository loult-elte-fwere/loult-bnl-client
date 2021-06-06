import {EventEmitter, Injectable} from '@angular/core';
import {UserData} from '../api/models/user-data';


@Injectable({providedIn: 'root'})
export class RoleProvider {
  private userData: UserData;
  private userCookie: string;

  constructor(
    // replace by UserService
    // private accountsService: AccountsService,
  ) {
  }

  public getCookie(): string {
    return window.localStorage.getItem('userCookie');
  }

  public isLogged() {
    // this.userToken = window.localStorage.getItem('token');
    // return this.userToken != undefined;
  }

  public async getUserData() {
    /*if (this.userData) {
      return this.userData;
    } else {
      this.userData = await this.accountsService.accountsDataGet().toPromise();
      window.localStorage.setItem('userData', JSON.stringify(this.userData));
      return this.userData;
    }*/
  }

  private loadUserData() {
    if (!this.userData) {
      this.userData = JSON.parse(window.localStorage.getItem('userData')) as UserData;
    }
  }

  public setCookie(cookie: string) {
    window.localStorage.setItem('userCookie', cookie);
    // this.getUserData().then((data) => this.eventsService.logInEvent.emit(true));
  }

  public logout() {
    window.localStorage.clear();
    this.userData = undefined;
    // this.eventsService.logInEvent.emit(false);
  }
}
