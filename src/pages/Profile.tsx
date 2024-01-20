import { useParams } from "react-router-dom";
import { Modal, Button, Form } from 'react-bootstrap';
import OrderList from "../components/OrderList";
import { useEffect, useState } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";

type ProfileProps = {};

interface CustomJwtPayload extends JwtPayload {
  username?: string;
}

const Profile = (props: ProfileProps) => {
  const { username } = useParams<{ username?: string }>();
  const userToken = localStorage.getItem("userToken");
  const [showEditModal, setShowEditModal] = useState(false);

  let decodedToken;

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

  const handleEditProfileClick = () => {
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };

  const handleEditProfileSubmit = (updatedProfileData: any) => {
    // Implement logic to update user profile with the new data
    console.log("Updated Profile Data:", updatedProfileData);
    setShowEditModal(false); // Close the modal after submission
  };

  return (
    <>
      <div
        className="container-fluid vw-100"
        style={{ marginTop: 150, marginBottom: 20 }}
      >
        <a className="btn btn-primary btn-success" onClick={handleEditProfileClick}>
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

      {showEditModal && (
  <Modal show={true} onHide={handleEditModalClose}>
    <Modal.Header closeButton>
      <Modal.Title>Edit Profile</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>First name:</Form.Label>
          <Form.Control type="text" name="firstName" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last name:</Form.Label>
          <Form.Control type="text" name="lastName" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" name="username" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>E-mail:</Form.Label>
          <Form.Control type="text" name="email" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" name="password" />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleEditModalClose}>
        Close
      </Button>
      <Button variant="primary" onClick={() => handleEditProfileSubmit(updatedProfileData)}>
        Save changes
      </Button>
    </Modal.Footer>
  </Modal>)}
    </>
  );
};

export default Profile;
