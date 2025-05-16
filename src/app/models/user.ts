import { Cart } from './cart';

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  pfp?: string;
  cart?: Cart;
}
