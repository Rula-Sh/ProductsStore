import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { I18nPipe } from '../../i18n/i18n.pipe';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-details',
  imports: [RouterModule, I18nPipe, ToastModule],
  providers: [MessageService],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  product: Product = {
    id: '',
    image: '',
    name: '',
    price: 0,
    properties: '',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private messageService: MessageService,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const productId = this.activatedRoute.snapshot.paramMap.get('id');

    if (productId) {
      this.productService.getProductById(productId).subscribe({
        next: (value) => {
          this.product = value;
          console.log('Product Loaded');
        },
        error: (err) => {
          console.log('Error Retrieving the Product: ' + err);
        },
      });
    } else {
      console.log('Product ID is null');
    }
  }

  addToCart(product: Product) {
    if (this.authService.isLoggedIn()) {
      this.cartService.addProductToCart(product);
      this.messageService.add({
        severity: 'success',
        summary: 'success',
        detail: 'Product Added To Cart',
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please Login First',
      });
    }
  }
}
