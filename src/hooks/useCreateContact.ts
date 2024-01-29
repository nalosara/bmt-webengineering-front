import { useMutation, useQueryClient } from 'react-query';
import { ContactService } from '../services';
import { Contact } from '../utils/types';


const useCreateContact = () => {
   const queryClient = useQueryClient();
   return useMutation((data: Contact) => ContactService.addContactForm(data), {
       onSuccess: () => {
           queryClient.invalidateQueries('contact-forms');
       },
   });
};


export default useCreateContact;