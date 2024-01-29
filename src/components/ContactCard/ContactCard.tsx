import { Colors } from "../../constants";
import { Contact } from "../../utils/types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import { jwtDecode } from 'jwt-decode';
import { useState } from "react";
import { useCreateContact } from "../../hooks";

type ContactProps = {};

const ContactCard = ({}: ContactProps) => {
  //const userToken = localStorage.getItem("userToken");
  const [contact, setContact] = useState<Contact>({
    email: "",
    subject: "",
    message: "",
    username: "",
  });

  const createContact = useCreateContact();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (values: Contact) => {
    setSubmitting(true);
    createContact.mutate(values, {
      onSuccess: () => {
        setSubmitting(false);
        toast.success("Message sent successfully!");
        setContact({
          email: "",
          subject: "",
          message: "",
          username: "",
        });
      },
      onError: (error: any) => {
        setSubmitting(false);
        toast.error("Sending message failed!", error)
      }
    });
  };
/*
  useEffect(() => {
    if (userToken) {
      try {
        const decodedToken = jwtDecode(userToken);
        const username = decodedToken.sub;
  
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      console.error("Token is null or undefined. Cannot decode.");
    }
  }, [userToken]);*/
  

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
              <label htmlFor="inputname">Username</label>
              <input
                type="text"
                className="form-control mt-1"
                id="username"
                name="username"
                placeholder="Username"
                value={contact.username}
                required
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
                value={contact.email}
                required
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
              value={contact.subject}
              required
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
              value={contact.message}
              required
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
