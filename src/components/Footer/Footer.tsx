import { Colors } from "../../constants"

type FooterProps = {}

function Footer({}: FooterProps) {
  return (
    <nav
      className="navbar navbar-expand-lg fixed-bottom container-fluid"
      style={{ height: "20px", backgroundColor: Colors.primary }}
    >
      <div className="container-fluid">
        <a
          className="navbar-brand"
          href="#"
          style={{ marginLeft: 50, fontSize: "12px", color: "white" }}
        >
          Powered by BeMyTECH
        </a>
      </div>
    </nav>
  )
}

export default Footer