import appAxios from "./appAxios";
import { Order } from "../utils/types";
import { BASE_URL } from "../constants";

const getOrders = async (): Promise<Order[]> => {
  return appAxios.get(`/orders/`).then((response) => {
    const data = response.data;
    console.log(data);
    return data;
  });
};

const getOrdersByUserId = async (userId: string): Promise<Order[]> => {
  try {
    const response = await appAxios.get(`/orders/userById/${userId}`);
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching orders by user ID:", error);
    throw error;
  }
};

const getOrdersByUsername = async (username: string): Promise<Order[]> => {
  try {
    const response = await appAxios.get(`/orders/userByUsername/${username}`);
    const data: Order[] = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching orders by user ID:", error);
    throw error;
  }
};

const addOrder = async (order: Order): Promise<Order> => {
  return appAxios
    .post(`${BASE_URL}/order/add-order`, order)
    .then((response) => {
      const data = response.data;
      console.log("Order ", data, " is added!");

      return data;
    });
};

const updateOrder = async (data: Order) => {
  try {
    const response = await appAxios.put(`${BASE_URL}/order/${data.id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating order:', error);
    return { error: 'Failed to update order.' };
  }
};

const deleteOrderById = async (id: string) => {
  return appAxios.delete(`${BASE_URL}/order/${id}`).then((response) => {
    const { data } = response;
    return data;
  });
};

export default { getOrders, getOrdersByUserId, getOrdersByUsername, addOrder, updateOrder, deleteOrderById };
