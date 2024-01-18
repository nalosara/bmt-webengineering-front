import { Link } from "react-router-dom";
import { Colors } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { logout } from "../../store/authSlice";
import { jwtDecode } from "jwt-decode";

type NavbarProps = {};

const Navbar = (props: NavbarProps) => {
  const { userToken } = useSelector((state: RootState) => state.auth);

  let username;

  if (userToken) {
    try {
      const decodedToken = jwtDecode(userToken);
      console.log("Decoded Token:", decodedToken);
      username = decodedToken.sub;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  } else {
    console.error("Token is null or undefined. Cannot decode.");
  }

  const dispatch = useDispatch();

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light fixed-top"
      style={{ marginTop: 20 }}
    >
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
            {!userToken ? (
              <>
                <li className="nav-item me-5">
                  <Link className="nav-link" to="/login">
                    <strong>LOGIN</strong>
                  </Link>
                </li>
                <li className="nav-item me-5">
                  <Link className="nav-link" to="/registration">
                    <strong>REGISTER</strong>
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item me-5">
                <a
                  className="nav-link me-5"
                  style={{ color: "red" }}
                  onClick={() => dispatch(logout())}
                >
                  <strong>LOGOUT</strong>
                </a>
              </li>
            )}
          </ul>
        </div>
        <Link
          to={`/profile/${username}`}
          className="btn btn-outline"
          style={{ color: Colors.primary, border: "none", marginRight: 30 }}
        >
          <i className="fas fa-user"></i>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
