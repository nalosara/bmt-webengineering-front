import { useMutation, useQueryClient } from 'react-query';
import { UserService } from '../services';
import { User } from '../utils/types';

const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation((data: User) => UserService.updateUser(data), {
        onSuccess: () => {
            queryClient.invalidateQueries('products');
        },
    });
};

export default useUpdateUser;