import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {env} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token = 'token';

  constructor(
    private http: HttpClient
  ) {
  }

  login({username, password}) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.back_url}/auth/login`, {username, password}, {observe: 'response'}).subscribe(data => {
          localStorage.setItem(this.token, `${data.headers.get('authorization')}`);
          resolve(data.body);
        }, err => {
          reject(err);
        }
      );
    });

  }

  logout() {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.back_url}/auth/logout`, {}).subscribe(value => {
          localStorage.removeItem(this.token);
          resolve();
        }, error => {
          localStorage.removeItem(this.token);
          console.log('login: ' + error);
          resolve();
        }
      );
    });
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.token);
    return !!token;
  }

}
