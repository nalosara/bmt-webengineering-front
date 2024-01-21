import { useQuery } from "react-query";
import { ProductService } from "../services";

const useProducts = () => {
   return useQuery('products',
       () => ProductService.getProducts()
   );
}

export default useProducts;