import { useMutation, useQueryClient } from 'react-query';
import { ProductService } from '../services';
import { Product } from '../utils/types';

const useCreateProduct = () => {
   const queryClient = useQueryClient();
   return useMutation((data: Product) => ProductService.addProduct(data), {
       onSuccess: () => {
           queryClient.invalidateQueries('products');
       },
   });
};

export default useCreateProduct;