import appAxios from "./appAxios";
import { Product } from "../utils/types";


const getProducts = async (): Promise<Product[]> => {
   return appAxios.get(`/products/`).then(
       (response) => {
           const data = response.data;
           console.log(data);
           return data;
       });
}

export default { getProducts };