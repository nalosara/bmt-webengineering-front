import { Colors } from "../../constants";
import 'bootstrap-icons/font/bootstrap-icons.css';

type HeaderProps = {};

const Header = ({}: HeaderProps) => {
  return (
    <nav
      className="navbar navbar-expand-lg fixed-top container-fluid"
      style={{ height: "30px", backgroundColor: Colors.primary }}
    >
      <div className="container-fluid">
        <a
          className="navbar-brand"
          href="#"
          style={{ fontSize: "10px", color: "white" }}
        >
          info@bemytech.ba
        </a>
        <div className="d-flex align-items-center">
          <a href="https://www.facebook.com/profile.php?id=100092992320897&mibextid=LQQJ4d" className="me-2 text-white">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="https://www.linkedin.com/company/bemytech/" className="text-white">
            <i className="bi bi-linkedin"></i>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
