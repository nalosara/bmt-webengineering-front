import { useMutation, useQueryClient } from 'react-query';

import { ProductService } from '../services';

const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation((id: string) => ProductService.deleteProductById(id), {
        onSuccess: () => {
            queryClient.invalidateQueries('products');
        },
    });
};

export default useDeleteProduct;