import { Component } from '@angular/core';
import { I18nService } from '../../i18n/i18n.service';
import { I18nPipe } from '../../i18n/i18n.pipe';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, PrimeIcons } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CartService } from '../../services/cart.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-products',
  imports: [
    I18nPipe,
    ToastModule,
    ConfirmDialogModule,
    CommonModule,
    ButtonModule,
  ],
  providers: [MessageService, ConfirmationService, PrimeIcons],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  products: Product[] = [
    {
      id: '',
      name: '',
      price: 0,
      properties: '',
      image: '',
    },
  ];

  constructor(
    private productService: ProductService,
    private router: Router,
    private messageService: MessageService,
    private cartService: CartService,
    private confirmationService: ConfirmationService,
    private authService: AuthService
  ) {}

  role: string | null = null;
  ngOnInit() {
    this.getProducts();
    this.role = localStorage.getItem('user_role');
  }

  getProducts() {
    this.productService.getAllProducts().subscribe({
      next: (value) => {
        this.products = value;
        console.log('Products Loaded Successfuly');
      },
      error: (err) => {
        console.log(`Failed to Load Products: ${err}`);
      },
    });
  }

  showProductDetails(id: string) {
    this.router.navigate([`products/${id}`]);
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

  deleteProduct(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this post?',
      header: 'DeletePost',
      accept: () => {
        this.productService.deleteProduct(id).subscribe({
          next: (value) => {
            console.log('Product deleted');
            this.getProducts();
          },
          error(err) {
            console.log('Error deleting product: ' + err);
          },
        });
        this.messageService.add({
          severity: 'error',
          summary: 'Product Deleted',
        });
      },
      reject: () => {},
    });
  }
}
