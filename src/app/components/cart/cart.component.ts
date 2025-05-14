import { Component } from '@angular/core';
import { Cart, CartItem } from '../../models/cart';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { I18nPipe } from '../../i18n/i18n.pipe';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, I18nPipe, ToastModule],
  providers: [MessageService],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cart: Cart = { products: [] };

  constructor(
    private cartService: CartService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }

  removeFromCart(item: CartItem): void {
    this.cartService.removeProduct(item.id);
  }

  increaseQuantity(item: CartItem): void {
    this.cartService.updateQuantity(item.id, item.quantity + 1);
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.id, item.quantity - 1);
    } else {
      this.removeFromCart(item);
    }
  }

  getCartTotal(): number {
    return this.cart.products.reduce((sum, item) => sum + item.productTotal, 0);
  }

  purchase(): void {
    this.messageService.add({
      severity: 'success',
      summary: 'success',
      detail: 'Purchase was Successful!',
    });

    this.cartService.clearCart();
    setTimeout(() => {
      // this.cart = this.cartService.getCart();
      this.router.navigate(['/']);
    }, 1000);
  }
}
