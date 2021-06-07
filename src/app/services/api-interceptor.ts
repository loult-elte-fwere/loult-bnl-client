import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, EMPTY} from 'rxjs';
import {tap} from 'rxjs/operators';
import {RoleProvider} from './role-provider';
import {CookieStorageService} from './cookie-storage.service';


@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(
    private cookieService: CookieStorageService,
  ) {
  }

  private static download(url: string): Observable<any> {
    window.open(url);
    return EMPTY;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Apply the headers
    const token = this.cookieService.userCookie;
    console.log(token);
    req = req.clone({
      setHeaders: {
        Loultcookie: `${token}`
      },
    });


    return next.handle(req).pipe(
      tap(x => x, err => {
        // Handle this err
        let errorMsg = 'The server returned an error for this action';
        switch (err.status) {
          case 404: {
            errorMsg = `Some entity cannot be found by the server`;
            break;
          }
          case 422: {
            // TODO : process more in detail the error fields
            errorMsg = `Some request field are missing or invalid`;
            break;
          }
          case 403: {
            const errorData = typeof err.error === 'string' ? JSON.parse(err.error) : err.error;
            errorMsg = `Some request field are invalid : ${errorData.message}`;
            break;
          }
          case 401: {
            const errorData = typeof err.error === 'string' ? JSON.parse(err.error) : err.error;
            errorMsg = errorData.message ? `You are not authorized: ${errorData.message}` : 'You are not authorized';
            break;
          }
          case 500: {
            errorMsg = `Something wrong happened on the server...`;
            break;
          }
          default: {
            console.log(err);
          }
        }
      })
    );
  }
}
