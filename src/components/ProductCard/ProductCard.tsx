import { Link } from "react-router-dom";
import { Colors } from "../../constants";
import { Product } from "../../utils/types";

type ProductProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductProps) => {
  return (
    <div className="col-12 col-md-3 m-3">
      <div className="card border-0 shadow" style={{ borderRadius: 40 }}>
        <div
          className="card-header"
          style={{ backgroundColor: "white", fontWeight: "bold" }}
        >
          {product.productName}
        </div>
        <div className="card-body">
          <img
            src={product.imageUrl}
            alt={product.productName}
            className="img-fluid"
            style={{ maxWidth: "100%", height: "200px" }}
          />
          <p className="card-text">
            <li className="list-group-item">{product.description}</li>
            <li className="list-group-item">
              {product.quantityInStock > 0 ? "In stock" : "Out of stock"}
            </li>
            <li className="list-group-item">Price: {product.price}</li>
          </p>
          <Link
            className="btn btn-info mx-1 text-white"
            to={`/product/${product.productName}`}
            style={{
              backgroundColor: Colors.tertiary,
              borderColor: Colors.tertiary,
            }}
          >
            View
          </Link>
          <a
            className="btn btn-primary"
            style={{
              backgroundColor: Colors.tertiary,
              borderColor: Colors.tertiary,
            }}
          >
            Order
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
