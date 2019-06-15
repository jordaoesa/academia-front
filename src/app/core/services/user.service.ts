import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {env} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers() {
    return this.http.get<any[]>(`${env.back_url}/users`);
  }

  create(user) {
    this.http.post(`${env.back_url}/users`, user);
  }
}
