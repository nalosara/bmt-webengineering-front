import { Colors } from "../../constants";
import { Contact } from "../../utils/types";
import { ContactService } from "../../services";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { useEffect, useState } from "react";

type ContactProps = {};

interface CustomJwtPayload extends JwtPayload {
  username?: string;
}

const ContactCard = (props: ContactProps) => {
  const userToken = localStorage.getItem("userToken");
  const [contact, setContact] = useState<Contact>({
    email: "",
    subject: "",
    message: "",
    username: "",
  });

  useEffect(() => {
    if (userToken) {
      try {
        const decodedToken = jwtDecode(userToken);
        console.log("Decoded Token:", decodedToken);
  
        // Access custom claims, e.g., username
        const username = decodedToken.sub;
        console.log("Username:", username);
  
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      console.error("Token is null or undefined. Cannot decode.");
    }
  }, [userToken]);
  

  const handleSubmit = async (contact: Contact) => {
    try {
      // Add logic to handle form submission and add the new product
      const addedContactForm = await ContactService.addContactForm(contact);

      if (addedContactForm) {
        console.log("Product added successfully:", addedContactForm);
        toast.success("Message sent successfully!");
      } else {
        console.error("Invalid added product data received:", addedContactForm);
        toast.error("Error sending message. Please try again.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Error sending message. Please try again.");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({ ...prevContact, [name]: value }));
  };

  return (
    <div className="container py-5">
      <div className="row py-5">
        <form
          className="col-md-9 m-auto"
          method="post"
          role="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(contact);
          }}
        >
          <div className="row">
            <div className="form-group col-md-6 mb-3">
              <label htmlFor="inputname">Name</label>
              <input
                type="text"
                className="form-control mt-1"
                id="name"
                name="name"
                placeholder="Name"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group col-md-6 mb-3">
              <label htmlFor="inputemail">Email</label>
              <input
                type="email"
                className="form-control mt-1"
                id="email"
                name="email"
                placeholder="Email"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="inputsubject">Subject</label>
            <input
              type="text"
              className="form-control mt-1"
              id="subject"
              name="subject"
              placeholder="Subject"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputmessage">Message</label>
            <textarea
              className="form-control mt-1"
              id="message"
              name="message"
              placeholder="Message"
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="row">
            <div className="col text-end mt-2">
              <button
                type="submit"
                className="btn btn-lg text-white"
                style={{ backgroundColor: Colors.secondary }}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactCard;
