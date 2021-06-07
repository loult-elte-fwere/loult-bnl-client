import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieStorageService {
  public userCookie: string | undefined;

  constructor() {
  }

  public loadCookie(): any {
    const cookie = window.localStorage.getItem('userCookie');
    if (cookie !== null) {
      this.userCookie = cookie;
    }
  }

  public hasCookie(): boolean {
    return this.userCookie === undefined;
  }

  public setCookie(cookie: string) {
    window.localStorage.setItem('userCookie', cookie);
    this.userCookie = cookie;
  }
}
