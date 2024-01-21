import appAxios from "./appAxios";
import { User } from "../utils/types";
import { BASE_URL } from "../constants";

const getUsers = async (): Promise<User[]> => {
  return appAxios.get(`${BASE_URL}/users/`).then((response) => {
    const data = response.data;
    console.log(data);
    return data;
  });
};

const getUserByUsername = async (username: string): Promise<User> => {
  return appAxios.get(`${BASE_URL}/users/${username}`).then((response) => {
    const data = response.data;
    console.log(data);
    return data;
  });
};

const updateUser = async (data: User) => {
  try {
    const response = await appAxios.put(`${BASE_URL}/users/${data.id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    return { error: 'Failed to update user.' };
  }
};

export default {
    getUsers,
    getUserByUsername,
    updateUser
  };
  