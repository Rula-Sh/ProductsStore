import { Component } from '@angular/core';
import { I18nPipe } from '../../i18n/i18n.pipe';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [I18nPipe, RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  userId: string | null = null;
  username: string | null = null;
  role: string | null = null;
  private userSub!: Subscription;
  cartCount: number = 0;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    // ----------  using needed user data token ----------
    this.userId = localStorage.getItem('id');
    this.username = localStorage.getItem('username');
    this.role = localStorage.getItem('user_role');
    this.cartCount = Number(localStorage.getItem('cartCount')) || 0;

    // ----------  using whole user token ----------
    // const user = this.authService.getCurrentUser();
    // this.userId = user?.id || null;
    // this.username = user?.username || null;
    // this.role = user?.role || null;
    // this.cartCount = user?.cart?.count || 0;

    // ---------- using currentUserSubject ----------
    // this.userSub = this.authService.currentUser$.subscribe((user) => {
    // this.userId = user?.id || null;
    // this.username = user?.username || null;
    // this.role = user?.role || null;
    // this.cartCount = user?.cart?.count || 0;
    // });
    console.log('this.cartCount', this.cartCount);
  }

  ngDoCheck() {
    this.userId = localStorage.getItem('id');
    this.username = localStorage.getItem('username');
    this.cartCount = Number(localStorage.getItem('cartCount')) || 0;
  }

  logout() {
    this.authService.logout();
    this.router.navigate([`/`]);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  goToCart(id: string) {
    this.router.navigate([`cart/${id}`]);
  }

  goToProfile(id: string) {
    this.router.navigate([`profile/${id}`]);
  }
}
