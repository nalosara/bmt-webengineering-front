import { Colors } from "../../constants";
import 'bootstrap-icons/font/bootstrap-icons.css';

type Props = {};

const Header = (props: Props) => {
  return (
    <nav
      className="navbar navbar-expand-lg fixed-top container-fluid"
      style={{ height: "20px", backgroundColor: Colors.primary }}
    >
      <div className="container-fluid">
        <a
          className="navbar-brand"
          href="#"
          style={{ marginLeft: 50, fontSize: "12px", color: "white" }}
        >
          info@bemytech.ba
        </a>
        <div className="d-flex" style={{ marginRight: 20}}>
          <a href="#" className="me-2 text-white">
            <i className="bi bi-facebook"></i>

          </a>
          <a href="#" className="text-white">
            <i className="bi bi-linkedin"></i>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
