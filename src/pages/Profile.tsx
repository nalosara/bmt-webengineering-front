import { useParams } from "react-router-dom";

import OrderList from "../components/OrderList";
import { useEffect } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";

type ProfileProps = {};

interface CustomJwtPayload extends JwtPayload {
  username?: string;
}

const Profile = (props: ProfileProps) => {
  const { username } = useParams<{ username?: string }>();
  const userToken = localStorage.getItem("userToken");

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

  return (
    <>
      <div
        className="container-fluid vw-100"
        style={{ marginTop: 150, marginBottom: 20 }}
      >
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
    </>
  );
};

export default Profile;
