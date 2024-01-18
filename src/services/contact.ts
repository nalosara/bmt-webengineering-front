import appAxios from "./appAxios";
import { Contact } from "../utils/types";
import { BASE_URL } from "../constants";

const getContactForms = async (): Promise<Contact[]> => {
  return appAxios.get(`${BASE_URL}/contact-forms/`).then((response) => {
    const data = response.data;
    console.log(data);
    return data;
  });
};

const addContactForm = async (contact: Contact): Promise<Contact> => {
    return appAxios
      .post(`${BASE_URL}/contact-forms/add-contact-form`, contact)
      .then((response) => {
        const data = response.data;
        console.log("Contact form ", data, " is added!");
  
        return data;
      });
  };

export default { getContactForms, addContactForm }