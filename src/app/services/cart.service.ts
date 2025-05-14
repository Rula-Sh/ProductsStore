import { inject, Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Cart, CartItem } from '../models/cart';
import { UserService } from './user.service';
import { User } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private userService = inject(UserService);
  private authService = inject(AuthService);

  constructor() {}

  addProductToCart(product: Product): void {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    // Initialize cart if needed
    if (!user.cart) {
      user.cart = { products: [] };
    } else if (!user.cart.products) {
      user.cart.products = [];
    }

    const existingItem = user.cart.products.find(
      (item) => item.id === product.id
    );

    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.productTotal = existingItem.quantity * existingItem.price;
    } else {
      const newItem: CartItem = {
        ...product,
        quantity: 1,
        productTotal: product.price,
      };
      user.cart.products.push(newItem);
    }

    // Update user on the server
    this.userService.UpdateProfile(user).subscribe((updatedUser) => {
      this.authService.login(updatedUser); // sync localStorage + currentUser
    });
  }
  removeProduct(productId: number): void {
    const user = this.authService.getCurrentUser();
    if (!user || !user.cart) return;

    user.cart.products = user.cart.products.filter(
      (item) => item.id !== productId
    );

    this.userService.UpdateProfile(user).subscribe((updatedUser) => {
      this.authService.login(updatedUser);
    });
  }
  updateQuantity(productId: number, quantity: number): void {
    const user = this.authService.getCurrentUser();
    if (!user || !user.cart) return;

    const item = user.cart.products.find((item) => item.id === productId);
    if (item) {
      item.quantity = quantity;
      item.productTotal = item.price * quantity;
    }

    this.userService.UpdateProfile(user).subscribe((updatedUser) => {
      this.authService.login(updatedUser);
    });
  }

  clearCart(): void {
    const user = this.authService.getCurrentUser();
    if (!user || !user.cart) return;

    user.cart.products = [];

    this.userService.UpdateProfile(user).subscribe((updatedUser) => {
      this.authService.login(updatedUser);
    });
  }

  getCart() {
    const user = this.authService.getCurrentUser();
    return user?.cart || { products: [] };
  }
}
