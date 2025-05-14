import { Cart } from './cart';

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  pfp?: string;
  cart?: Cart;
}
