import appAxios from "./appAxios";
import { Order } from "../utils/types";

const getOrders = async (): Promise<Order[]> => {
  return appAxios.get(`/orders/`).then((response) => {
    const data = response.data;
    console.log(data);
    return data;
  });
};

const getOrdersByUserId = async (userId: string): Promise<Order[]> => {
  try {
    const response = await appAxios.get(`/orders/user/${userId}`);
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching orders by user ID:", error);
    throw error;
  }
};

export default { getOrders, getOrdersByUserId };
