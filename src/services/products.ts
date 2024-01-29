import appAxios from "./appAxios";
import { Product } from "../utils/types";

const getProducts = async (): Promise<Product[]> => {
  return appAxios.get(`/products/`).then((response) => {
    const data = response.data;
    console.log(data);
    return data;
  });
};

const getProductById = async (id: string): Promise<Product> => {
  return appAxios.get(`/products/${id}`).then((response) => {
    const data = response.data;
    console.log(data);
    return data;
  });
};

const addProduct = async (product: Product): Promise<Product> => {
  return appAxios
    .post(`/products/add-product`, product)
    .then((response) => {
      const data = response.data;

      return data;
    });
};

const updateProduct = async (data: Product) => {
  try {
    const response = await appAxios.put(`/products/${data.id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    return { error: 'Failed to update product.' };
  }
};

const deleteProductById = async (id: string) => {
  return appAxios.delete(`/products/${id}`).then((response) => {
    const { data } = response;
    return data;
  });
};

export default {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProductById,
};
