import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}
  api = inject(HttpClient);
  url = 'http://localhost:3000/users';

  getAllUsers(): Observable<User[]> {
    return this.api.get<User[]>(this.url);
  }

  getUserById(id: string): Observable<User> {
    return this.api.get<User>(`${this.url}/${id}`);
  }

  CreateUser(user: Omit<User, 'id'>): Observable<User> {
    return this.api.post<User>(this.url, user);
  }

  UpdateProfile(user: User): Observable<User> {
    return this.api.put<User>(`${this.url}/${user.id}`, user);
  }
}
