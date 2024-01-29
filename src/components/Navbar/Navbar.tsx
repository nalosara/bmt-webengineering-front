import { Link } from "react-router-dom";
import { Colors } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { logout } from "../../store/authSlice";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Nav, Navbar } from 'react-bootstrap';

type NavbarProps = {};

interface CustomJwtPayload extends JwtPayload {
  authorities?: string[];
}

const NavbarComponent = ({}: NavbarProps) => {
  const { userToken } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  let username;
  let authorities: string[] | undefined;

  if (userToken) {
    try {
      const decodedToken: CustomJwtPayload = jwtDecode(userToken);
      authorities = decodedToken.authorities;
      username = decodedToken.sub;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  } else {
    console.error("Token is null or undefined. Cannot decode.");
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" fixed="top" className="mt-4">
      <Navbar.Brand as={Link} to="/">
        <img
          src="dist/assets/images/BeMyTECH-logo-cropped.png"
          alt=""
          width="120"
          height="60"
          style={{ marginLeft: 80 }}
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{ marginRight: 30 }} />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/home" style={{ fontWeight: "bold", marginRight: 20 }}>HOME</Nav.Link>
          <Nav.Link as={Link} to="/about" style={{ fontWeight: "bold", marginRight: 20 }}>ABOUT</Nav.Link>
          <Nav.Link as={Link} to="/shop" style={{ fontWeight: "bold", marginRight: 20 }}>SHOP</Nav.Link>
          <Nav.Link as={Link} to="/contact" style={{ fontWeight: "bold", marginRight: 20 }}>CONTACT</Nav.Link>
          {!userToken ? (
            <>
              <Nav.Link as={Link} to="/login" style={{ color: Colors.primary, marginRight: 30, fontWeight: "bold" }}>LOGIN</Nav.Link>
              <Nav.Link as={Link} to="/registration" style={{ color: Colors.primary, marginRight: 30, fontWeight: "bold" }}>REGISTER</Nav.Link>
            </>
          ) : (
            <Nav.Link onClick={handleLogout} style={{ color: "red", fontWeight: "bold" }}>LOGOUT</Nav.Link>
          )}
        </Nav>
        <Nav>
          <Nav.Link as={Link} to={`/profile/${username}`} style={{ color: Colors.primary, marginRight: 30 }}>
            <i className="fas fa-user"></i>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
