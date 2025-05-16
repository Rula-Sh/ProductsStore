import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn = false;
  private redirectUrl = '';

  // private currentUserSubject = new BehaviorSubject<User | null>(null);
  // currentUser$ = this.currentUserSubject.asObservable();
  //
  constructor() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      // this.currentUserSubject.next(JSON.parse(savedUser));
      this.loggedIn = true;
    }
  }

  login(user: User) {
    this.loggedIn = true;
    // ----------  using needed user data token ----------
    const mockToken = 'mock-token';
    localStorage.setItem('auth_token', mockToken);
    localStorage.setItem('id', user.id);
    localStorage.setItem('username', user.username);
    localStorage.setItem('email', user.email);
    localStorage.setItem('user_role', user.role);
    if (user.cart) {
      localStorage.setItem('cart', JSON.stringify(user.cart));
      localStorage.setItem('cartCount', user.cart.count.toString());
    }

    // ----------  using whole user token ----------
    // const mockToken = 'mock-auth-token';
    // localStorage.setItem('auth_token', mockToken);
    // localStorage.setItem('user', JSON.stringify(user));
    // ---------- using currentUserSubject ----------
    // localStorage.setItem('user', JSON.stringify(user));
    // this.currentUserSubject.next(user);
  }

  logout() {
    this.loggedIn = false;
    // ----------  using needed user data token ----------
    localStorage.removeItem('auth_token');
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('user_role');

    // ----------  using whole user token ----------
    // localStorage.removeItem('auth_token');
    // localStorage.removeItem('user');

    // ---------- using currentUserSubject ----------
    // localStorage.removeItem('user');
    // this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    // ----------  using whole user token ----------
    return !!localStorage.getItem('auth_token');

    // ---------- using currentUserSubject ----------
    // return this.loggedIn;
  }

  getCurrentUser(): User | null {
    // ----------  using needed user data token ----------
    const id = localStorage.getItem('id');
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const role = localStorage.getItem('user_role');
    const cartJson = localStorage.getItem('cart');
    if (username && email && role) {
      const user: User = { id, username, email, role } as User;
      if (cartJson) {
        user.cart = JSON.parse(cartJson);
      }
      return user;
    }
    return null;

    // ----------  using whole user token ----------
    // const userJson = localStorage.getItem('user');
    // return userJson ? JSON.parse(userJson) : null;

    // ---------- using currentUserSubject ----------
    // return this.currentUserSubject.value;
  }

  setRedirectUrl(url: string) {
    this.redirectUrl = url;
  }

  getRedirectURL(): string | null {
    return this.redirectUrl;
  }
}
