import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) {
  }

  getCookie(key: string): string {
    return this.cookieService.get(key);
  }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    // const idToken = localStorage.getItem('token');
    const idToken = this.getCookie('token');

    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set('x-access-token', idToken)
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
