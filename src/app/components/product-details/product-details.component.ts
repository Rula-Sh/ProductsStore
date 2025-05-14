import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { I18nPipe } from '../../i18n/i18n.pipe';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-details',
  imports: [RouterModule, I18nPipe, ToastModule],
  providers: [MessageService],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  product: Product = {
    id: 0,
    image: '',
    name: '',
    price: 0,
    properties: '',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    var productId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.productService.getProductById(productId).subscribe({
      next: (value) => {
        this.product = value;
        console.log('Product Loaded');
      },
      error: (err) => {
        console.log('Error Retrieving the Product: ' + err);
      },
    });
  }

  addToCart() {
    this.messageService.add({
      severity: 'success',
      summary: 'success',
      detail: 'ProductAddedToCart',
    });
  }
}
