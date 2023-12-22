import CartCard from "../components/CartCard";

type ProfileProps = {};

const Profile = (props: ProfileProps) => {
  return (
    <div className="container-fluid vw-100">
      <div className="container">
      <header>
        <h1>Welcome, Sara Nalo!</h1>
      </header>
        <p>
          Here, you can view and manage your account information, and check your
          orders.
        </p>
      </div>
      <div className="container">
          <CartCard />
        </div>
    </div>
  );
};

export default Profile;
