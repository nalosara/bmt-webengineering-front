import { useQuery, useQueryClient } from 'react-query';
import { OrderService } from '../services';

const useOrdersByUsername = (username: string) => {
    const queryClient = useQueryClient();
    return useQuery(['orders', username], () => OrderService.getOrdersByUsername(username), {
        onSuccess: () => {
            queryClient.invalidateQueries('orders');
        },
    });
};

export default useOrdersByUsername;