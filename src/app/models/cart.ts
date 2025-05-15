import { Product } from "./product";

export interface Cart {
  products: CartItem[];
  count: number;
}

export interface CartItem extends Product {
  quantity: number;
  productTotal: number;
}