import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private auth: AuthService) { }

  getUsers(): Observable<{ users: User[], message: string }> {
    if (this.auth.checkTokenExpiration()) {
      this.auth.getNewToken();
    }
    return this.http.get<{ users: User[], message: string }>('https://incidents-server.herokuapp.com/api/getUsers');
  }

  addUser(newUser: { username: string; password: string; birthday: string; position: string; areas: Array<string> }):
    Observable<{ users: User[]; message: string }> {
    if (this.auth.checkTokenExpiration()) {
      this.auth.getNewToken();
    }
    return this.http.post<{ users: User[], message: string }>('https://incidents-server.herokuapp.com/api/addUser', { newUser });
  }
}
