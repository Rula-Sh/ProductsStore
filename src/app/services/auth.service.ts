import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn = false;
  private redirectUrl = '';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
      this.loggedIn = true;
    }
  }

  login(user: User) {
    this.loggedIn = true;
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  logout() {
    this.loggedIn = false;
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  setRedirectUrl(url: string) {
    this.redirectUrl = url;
  }

  getRedirectURL(): string | null {
    return this.redirectUrl;
  }
}
