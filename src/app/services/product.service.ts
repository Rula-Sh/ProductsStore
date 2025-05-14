import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}
  api = inject(HttpClient);
  url = 'http://localhost:3000';

  getAllProducts(): Observable<Product[]> {
    return this.api.get<Product[]>(`${this.url}/products`);
  }

  getProductById(id: number): Observable<Product> {
    return this.api.get<Product>(`${this.url}/products/${id}`);
  }

  AddProduct(product: Product): Observable<Product> {
    return this.api.post<Product>(`${this.url}/products`, product);
  }

  AddToCart(id: number): Observable<Product> {
    return this.api.get<Product>(`${this.url}/products/${id}`);
  }
}
