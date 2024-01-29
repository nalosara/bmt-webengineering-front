import { useQuery } from "react-query";
import { OrderService } from "../services";

const useOrders = () => {
   return useQuery('orders',
       () => OrderService.getOrders()
   );
}

export default useOrders;