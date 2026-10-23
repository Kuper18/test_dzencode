import type { AxiosRequestConfig } from 'axios';

export type AxiosCustomConfig = Omit<AxiosRequestConfig, 'baseURL'>;

export type AuthResponse = {
  refresh: string;
  access: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type SignupPayload = Pick<LoginPayload, 'email' | 'password'> & {
  first_name: string;
  last_name: string;
};

export type UserProfileResponse = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
};

export type Currency = {
  USD?: number;
  UAH?: number;
};

export type Price = {
  id: number;
  value: string;
  currency: 'USD' | 'UAH';
  is_default: boolean;
};

export type Product = {
  id: number;
  title: string;
  serial_number: number;
  is_new: boolean;
  type: string;
  specification: string;
  guarantee_start: string;
  guarantee_end: string;
  order: number;
  image: string | null;
  prices: Price[];
  created_at: string;
};

export type Order = {
  id: number;
  title: string;
  description: string;
  total_products: number;
  total_prices: Currency;
  created_at: string;
};

export type OrderDetail = Order & {
  products: Product[];
};

export type ProductPayload = Omit<
  Product,
  'id' | 'created_at' | 'prices' | 'image'
> & {
  prices: Omit<Price, 'id'>[];
};

export type UploadImageResponse = {
  id: number;
  image: string;
};

export type CreateOrderPayload = {
  title: string;
  description: string;
}
