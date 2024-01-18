
import { useParams } from "react-router-dom";

import OrderList from "../components/OrderList";

type ProfileProps = {};

const Profile = (props: ProfileProps) => {
  const { username } = useParams<{ username?: string }>();

  return (
    <>
      <div className="container-fluid vw-100" style={{ marginTop: 150, marginBottom: 20 }}>
        <header>
          <h1>Welcome, {username}</h1>
        </header>
        <p>
          Here, you can view and manage your account information, and check your
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
