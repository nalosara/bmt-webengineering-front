import { useParams } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import OrderList from "../components/OrderList";
import { useEffect, useState } from "react";
import { UserService } from "../services";
import { User } from "../utils/types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ProfileProps = {};

const Profile = (props: ProfileProps) => {
  const { username } = useParams<{ username?: string }>();
  const userToken = localStorage.getItem("userToken");
  const [user, setUser] = useState<User>();
  const [profileFormData, setProfileFormData] = useState({
    id: user?.id,
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [showEditModal, setShowEditModal] = useState(false);
  

  

  useEffect(() => {
    const fetchData = async () => {
      if (username) {
        const userInfo = await UserService.getUserByUsername(username);
        setUser(userInfo);
        console.log("User profile useffect: ", userInfo.id);
        if (user) {
          setProfileFormData({
            ...profileFormData,
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            username: user.username || "",
            email: user.email || "",
            password: "",
          });
        } else {
          console.error("Failed to fetch user profile data");
        }
      } else {
        console.error("Token is null or undefined. Cannot decode.");
      }
    };

    // Call the fetchData function
    fetchData();
  }, [userToken, username]);


  const handleEditProfileClick = () => {
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Extract updated values from form fields
      const updatedFirstName = (
        e.currentTarget.elements.namedItem("editFirstName") as HTMLInputElement
      )?.value!;
      const updatedLastName = (
        e.currentTarget.elements.namedItem("editLastName") as HTMLInputElement
      )?.value!;
      const updatedEmail = (
        e.currentTarget.elements.namedItem("editEmail") as HTMLInputElement
      )?.value!;
      const updatedPassword = (
        e.currentTarget.elements.namedItem("editPassword") as HTMLInputElement
      )?.value!;

      // Check if any required field is missing or invalid
      if (
        !updatedFirstName ||
        !updatedLastName ||
        !updatedEmail ||
        !updatedPassword
      ) {
        console.error(
          "Invalid form input. Please fill in all fields with valid values."
        );
        return;
      }

      // Add logic to handle form submission and update the product
      if (user) {
        const updatedUser = await UserService.updateUser({
          ...user,
          id: user?.id,
          firstName: updatedFirstName,
          lastName: updatedLastName,
          email: updatedEmail,
          password: updatedPassword,
        });
        console.log("updated user: ");

        if (updatedUser) {
          // Optionally, you can update the UI or perform other actions after updating
          console.log("User updated successfully:", user);
          toast.success("User updated successfully!");
        } else {
          console.error("Invalid updated user data received:", user);
          toast.error("Error updating user. Please try again.");
          // Handle the case where the updated product data is invalid
        }
      }
    } catch (error) {
      // Handle errors (e.g., display an error message to the user)
      console.error("Error updating user:", error);
      toast.error("Error updating user. Please try again.");
    } finally {
      setShowEditModal(false); // Close the modal after submission or in case of an error
    }
  };

  return (
    <>
      <div
        className="container-fluid vw-100"
        style={{ marginTop: 150, marginBottom: 20 }}
      >
        <a
          className="btn btn-primary btn-success"
          onClick={handleEditProfileClick}
        >
          Edit profile
        </a>
        <header>
          <h1>Welcome, {username}</h1>
        </header>
        <p>
          Here, you can view and manage your account information, and check
          orders.
        </p>
      </div>
      <div className="container-fluid vw-100">
        <OrderList />
      </div>

      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group controlId="editFirstName">
              <Form.Label>First name:</Form.Label>
              <Form.Control
                type="text"
                value={user?.firstName || ""}
                onChange={(e) =>
                  setUser((prevUser) => ({
                    ...prevUser!,
                    firstName: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group controlId="editLastName">
              <Form.Label>Last name:</Form.Label>
              <Form.Control
                type="text"
                value={user?.lastName || ""}
                onChange={(e) =>
                  setUser((prevUser) => ({
                    ...prevUser!,
                    lastName: e.target.value,
                  }))
                }
              />
            </Form.Group>

            <Form.Group controlId="editEmail">
              <Form.Label>E-mail:</Form.Label>
              <Form.Control
                type="text"
                value={user?.email || ""}
                onChange={(e) =>
                  setUser((prevUser) => ({
                    ...prevUser!,
                    email: e.target.value,
                  }))
                }
              />
            </Form.Group>

            <Form.Group controlId="editPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={user?.password || ""}
                onChange={(e) =>
                  setUser((prevUser) => ({
                    ...prevUser!,
                    password: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Button variant="primary" type="submit" style={{ marginTop: 20 }}>
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Profile;
