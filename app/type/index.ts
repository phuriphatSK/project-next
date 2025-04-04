// types.ts
export interface Product {
  _id: string;
  userId: string;
  name: string;
  description: string;
  price: number;
  offerPrice: number;
  image: string[];
  category: string;
  date: number;
  __v: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  imageUrl: string;
  cartItems: Record<string, number>; // Add this line
  __v: number;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  _id: string;
}

export interface Address {
  _id: string;
  userId: string;
  fullName: string;
  phoneNumber: string;
  pincode: number;
  area: string;
  city: string;
  state: string;
  __v: number;
}

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  amount: number;
  address: Address;
  status: string;
  date: number;
  __v: number;
}

export interface ProductType {
  _id: string;
  name: string;
  description: string;
  offerPrice: number;
  price: number;
  image: string[];
  category: string;
}
