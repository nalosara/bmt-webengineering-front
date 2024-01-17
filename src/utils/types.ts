export type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  userType: string;
}

export type Product = {
  id: string;
  name: string;
  description: string;
  imageUrl: string,
  quantityInStock: number;
  price: number;
};

export type Order = {
  id: string;
  userId: string;
  address: string;
  orderDate: Date;
  products: OrderedProduct[]
}

export type OrderedProduct = {
  product: Product;
  quantity: number;
}
