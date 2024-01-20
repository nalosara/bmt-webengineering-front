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
  id: string,
  name: string;
  description: string;
  imageUrl: string,
  quantityInStock: number;
  price: number;
};

export type Order = {
  userId: string,
  username: string,
  product: Product,
  quantity: number,
  address: string,
  orderDate: Date;
}

export type Contact = {
  email: string,
  subject: string,
  message: string,
  username: string;
}
