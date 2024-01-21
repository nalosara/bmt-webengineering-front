import { useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import OrderList from "../components/OrderList";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { UserService } from "../services";
import { jwtDecode } from "jwt-decode";
import { User } from "../utils/types";

type ProfileProps = {};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters"),
});

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
  const [initialValues, setInitialValues] = useState<User>({
    id: "",
    firstName: "",
    lastName: "",
    username: "",
    userType: "",
    password: "",
    email: "",
  });

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
            console.log("User profile: ", userProfile);
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
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleEditProfileSubmit}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Modal.Body>
                  <div className="row pb-3">
                    <label htmlFor="firstName">First name:</label>
                    <Field
                      type="text"
                      name="firstName"
                      placeholder="Enter first name"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="row pb-3">
                    <label htmlFor="lastName">Last name:</label>
                    <Field
                      type="text"
                      name="lastName"
                      placeholder="Enter last name"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="row pb-3">
                    <label htmlFor="email">E-mail:</label>
                    <Field
                      type="text"
                      name="email"
                      placeholder="Enter e-mail"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="row pb-3">
                    <label htmlFor="password">Password:</label>
                    <Field
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="error"
                    />
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button type="submit" variant="primary" onClick={() => handleSubmit}>
                    Save Changes
                  </Button>
                  <Button variant="secondary" onClick={handleEditModalClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal>
      )}
    </>
  );
};

export default Profile;
