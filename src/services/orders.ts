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
    const response = await appAxios.get(`/orders/order-by-id/${userId}`);
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
    const response = await appAxios.get(`/orders/order-by-username/${username}`);
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
    .post(`${BASE_URL}/orders/add-order`, order)
    .then((response) => {
      const data = response.data;
      console.log("Order ", data, " is added!");

      return data;
    });
};

const deleteOrderById = async (id: string) => {
  return appAxios.delete(`${BASE_URL}/orders/${id}`).then((response) => {
    const { data } = response;
    return data;
  });
};

export default { getOrders, getOrdersByUserId, getOrdersByUsername, addOrder, deleteOrderById };
