import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '../services/auth.service';

// Quelle: https://angular.io/api/common/http/HttpInterceptor
@Injectable({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    if(req.url.match('/login') || req.url.match('/register')) {
      return next.handle(req);
    } else {
        const authToken = this.auth.getAccessToken();
        if (authToken !== undefined && authToken !== ''){
          const authReq = req.clone(
            {headers: req.headers.set('Authorization', 'Basic ' + authToken)}
          );
          return next.handle(authReq);
        }
        return next.handle(req.clone());
    }
  }
}

