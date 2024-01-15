import appAxios from "./appAxios";
import { Product } from "../utils/types";
import { AxiosResponse } from "axios";

const getProducts = async (): Promise<Product[]> => {
  return appAxios.get(`/products/`).then((response) => {
    const data = response.data;
    console.log(data);
    return data;
  });
};

const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const response: AxiosResponse<Product> = await appAxios.get(
      `/products/${id}`
    );

    const product: Product = response.data;

    if (product && typeof product === "object" && "name" in product) {
      console.log("Product:", product);
      return product;
    } else {
      console.error("Invalid product data received:", product);
      return null;
    }
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};

const updateProduct = async (id: string, updatedProductData: Partial<Product>): Promise<Product | null> => {
    try {
      const response: AxiosResponse<Product> = await appAxios.put(`/products/${id}`, updatedProductData);
  
      const updatedProduct: Product = response.data;
  
      if (updatedProduct && typeof updatedProduct === "object" && "name" in updatedProduct) {
        console.log("Product updated successfully:", updatedProduct);
        return updatedProduct;
      } else {
        console.error("Invalid updated product data received:", updatedProduct);
        return null;
      }
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  };

// doesnt work properly
const deleteProductById = async (id: string): Promise<void> => {
  try {
    await appAxios.delete(`/products/${id}`);
    console.log(`Product with ID ${id} deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    throw error;
  }
};

export default { getProducts, getProductById, updateProduct, deleteProductById };
