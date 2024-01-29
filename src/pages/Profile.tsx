import { useParams } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import OrderList from "../components/OrderList";
import { useEffect, useState } from "react";
import { UserService } from "../services";
import { User } from "../utils/types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bcrypt from "bcryptjs";
import { useUpdateUser } from "../hooks";

type ProfileProps = {};

const Profile = ({}: ProfileProps) => {
  const { username } = useParams<{ username?: string }>();
  const userToken = localStorage.getItem("userToken");
  const [user, setUser] = useState<User | undefined>(undefined);
  const [profileFormData, setProfileFormData] = useState({
    id: user?.id,
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [showEditModal, setShowEditModal] = useState(false);

  const updateUser = useUpdateUser();

  useEffect(() => {
    const fetchData = async () => {
      if (username) {
        try {
          const fetchedUser = await UserService.getUserByUsername(username);
          setUser(fetchedUser || undefined);

        } catch (error) {
          console.error("Error fetching user profile data:", error);
        }
      } else {
        console.error("Token is null or undefined. Cannot decode.");
      }
    };

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

      if (!updatedFirstName || !updatedLastName || !updatedEmail) {
        console.error(
          "Invalid form input. Please fill in all fields with valid values."
        );
        return;
      }

      let hashedPassword = updatedPassword;

      if (updatedPassword !== user?.password) {
        hashedPassword = await bcrypt.hash(updatedPassword, 10);
      }

      if (user) {
        const updatedUser = await updateUser.mutateAsync({
          ...user,
          id: user?.id,
          firstName: updatedFirstName,
          lastName: updatedLastName,
          email: updatedEmail,
          password: hashedPassword,
        });

        if (updatedUser) {
          console.log("User updated successfully:", user);
          toast.success("User updated successfully!");
        } else {
          console.error("Invalid updated user data received:", user);
          toast.error("Error updating user. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user. Please try again.");
    } finally {
      setShowEditModal(false);
    }
  };

  return (
    <>
      <div
        className="container-fluid vw-100"
        style={{ marginTop: 150, marginBottom: 50 }}
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
          {user?.userType.includes("ADMIN")
            ? "Here, you can view a list of all orders from all users."
            : "Here, you can view and manage your account information, and check your orders."}
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
