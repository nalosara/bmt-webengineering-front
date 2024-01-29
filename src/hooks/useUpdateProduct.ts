import { useMutation, useQueryClient } from 'react-query';
import { ProductService } from '../services';
import { Product } from '../utils/types';

const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation((data: Product) => ProductService.updateProduct(data), {
        onSuccess: () => {
            queryClient.invalidateQueries('products');
        },
    });
};

export default useUpdateProduct;