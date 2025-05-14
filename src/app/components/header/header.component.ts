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
  userId: number | null = null;
  username: string | null = null;
  role: string | null = null;
  private userSub!: Subscription;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.userSub = this.authService.currentUser$.subscribe((user) => {
      this.userId = user?.id || null;
      this.username = user?.username || null;
      this.role = user?.role || null;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate([`/`]);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  goToCart(id: number) {
    this.router.navigate([`cart/${id}`]);
  }

  goToProfile(id: number) {
    this.router.navigate([`profile/${id}`]);
  }
}
