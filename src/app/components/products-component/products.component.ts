import { Component } from '@angular/core';
import { I18nService } from '../../i18n/i18n.service';
import { I18nPipe } from '../../i18n/i18n.pipe';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products',
  imports: [I18nPipe, ToastModule],
  providers: [MessageService],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  products: Product[] = [
    {
      id: 0,
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
    private cartService: CartService
  ) {}

  ngOnInit() {
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

  showProductDetails(id: number) {
    this.router.navigate([`products/${id}`]);
  }

  addToCart(product: Product) {
    this.cartService.addProductToCart(product);
    this.messageService.add({
      severity: 'success',
      summary: 'success',
      detail: 'Product Added To Cart',
    });
  }
}
