import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {env} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token');

    if (req.url.includes(env.back_url) && token) {
      //adding token as authentication header
      let asd = req.clone({headers: req.headers.set('Authorization', token)});
      return next.handle(asd);
    }

    return next.handle(req);
  }

}
