import { useParams } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import OrderList from "../components/OrderList";
import { useEffect, useState } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { UserService } from "../services";

type ProfileProps = {};

interface CustomJwtPayload extends JwtPayload {
  username?: string;
}

const Profile = (props: ProfileProps) => {
  const { username } = useParams<{ username?: string }>();
  const userToken = localStorage.getItem("userToken");
  const [profileFormData, setProfileFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (userToken) {
        try {
          const decodedToken = jwtDecode(userToken);
          console.log("Decoded Token:", decodedToken);

          // Access custom claims, e.g., username
          const username = decodedToken.sub;
          console.log("Username:", username);

          // Fetch user profile data
          if (username) {
            const userProfile = await UserService.getUserByUsername(username);
            console.log(userProfile);
            if (userProfile) {
              setProfileFormData({
                ...profileFormData,
                firstName: userProfile.firstName || "",
                lastName: userProfile.lastName || "",
                username: userProfile.username || "",
                email: userProfile.email || "",
                password: "", // You may leave this empty or set it to some default value
              });
            } else {
              console.error("Failed to fetch user profile data");
            }
          }
        } catch (error) {
          console.error(
            "Error decoding token or fetching user profile:",
            error
          );
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

      {showEditModal && (
        <Modal show={true} onHide={handleEditModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>First name:</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={profileFormData.firstName}
                  onChange={(e) =>
                    setProfileFormData({
                      ...profileFormData,
                      firstName: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last name:</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={profileFormData.lastName}
                  onChange={(e) =>
                    setProfileFormData({
                      ...profileFormData,
                      lastName: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={profileFormData.username}
                  onChange={(e) =>
                    setProfileFormData({
                      ...profileFormData,
                      username: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>E-mail:</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  value={profileFormData.email}
                  onChange={(e) =>
                    setProfileFormData({
                      ...profileFormData,
                      email: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={profileFormData.password}
                  onChange={(e) =>
                    setProfileFormData({
                      ...profileFormData,
                      password: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditModalClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => handleEditProfileSubmit(profileFormData)}
            >
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default Profile;
