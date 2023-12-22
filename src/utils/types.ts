export type Product = {
  productName: string;
  description: string;
  imageUrl: string,
  quantityInStock: number;
  price: number;
};

export type User = {
  firstName: string,
  lastName: string,
}

export type OrderedProduct = {
  product: Product,
  quantity: number
}
