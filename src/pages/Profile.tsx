import CartCard from "../components/CartCard";

type ProfileProps = {};

const Profile = (props: ProfileProps) => {
  return (
    <div className="container-fluid">
      <header>
        <h1>Welcome, Sara Nalo!</h1>
      </header>
      <div className="container-fluid">
        <p>
          Here, you can view and manage your account information, and check your
          orders.
        </p>
        <div className="d-flex">
          <CartCard />
        </div>
      </div>
    </div>
  );
};

export default Profile;
