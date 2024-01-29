import appAxios from "./appAxios";
import { Contact } from "../utils/types";

const getContactForms = async (): Promise<Contact[]> => {
  return appAxios.get(`/contact-forms/`).then((response) => {
    const data = response.data;
    console.log(data);
    return data;
  });
};

const addContactForm = async (contact: Contact): Promise<Contact> => {
    return appAxios
      .post(`/contact-forms/add-contact-form`, contact)
      .then((response) => {
        const data = response.data;
        console.log("Contact form is added!");
  
        return data;
      });
  };

export default { getContactForms, addContactForm }