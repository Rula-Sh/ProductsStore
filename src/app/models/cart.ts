import { Product } from "./product";

export interface Cart {
  products: CartItem[];
}

export interface CartItem extends Product {
  quantity: number;
  productTotal: number;
}