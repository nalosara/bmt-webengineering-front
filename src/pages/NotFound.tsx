import { Link } from "react-router-dom"
import { Colors } from "../constants"

type NotFoundProps = {}

const NotFound = (props: NotFoundProps) => {
  return (
    <div className="d-flex align-items-center justify-content-center vw-100">
            <div className="text-center">
                <h1 className="display-1 fw-bold">404</h1>
                <p className="fs-3"> <span className="text-danger">Oops!</span> Page not found.</p>
                <p className="lead">
                    The page you are looking for does not exist.
                </p>
                <Link to="/" className="btn text-white" style={{ backgroundColor: Colors.secondary }}>Go Home</Link>
            </div>
        </div>
  )
}

export default NotFound