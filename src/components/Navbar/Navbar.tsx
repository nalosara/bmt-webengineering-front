import { Link } from "react-router-dom";
import { Colors } from "../../constants";

type NavbarProps = {};

const Navbar = (props: NavbarProps) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top" style={{ marginTop: 20}}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src="src/assets/images/BeMyTECH-logo-cropped.png"
            alt=""
            width="120"
            height="60"
            style={{ marginLeft: 80 }}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-center align-items-center"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav">
            <li className="nav-item me-5">
              <Link className="nav-link" to="/home">
                <strong>HOME</strong>
              </Link>
            </li>
            <li className="nav-item me-5">
              <Link className="nav-link" to="/about">
                <strong>ABOUT</strong>
              </Link>
            </li>
            <li className="nav-item me-5">
              <Link className="nav-link" to="/shop">
                <strong>SHOP</strong>
              </Link>
            </li>
            <li className="nav-item me-5">
              <Link className="nav-link" to="/login">
                <strong>LOGIN</strong>
              </Link>
            </li>
          </ul>
        </div>
        <Link to="/profile" className="btn btn-outline" style={{ color: Colors.primary, border: 'none', marginRight: 30 }}>
          <i className="fas fa-user"></i>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
