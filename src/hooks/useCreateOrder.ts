import { useMutation, useQueryClient } from 'react-query';
import { OrderService } from '../services';
import { Order } from '../utils/types';

const useCreateOrder = () => {
   const queryClient = useQueryClient();
   return useMutation((data: Order) => OrderService.addOrder(data), {
       onSuccess: () => {
           queryClient.invalidateQueries('orders');
       },
   });
};

export default useCreateOrder;