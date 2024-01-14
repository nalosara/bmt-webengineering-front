import { Link, useParams } from "react-router-dom";
import { Colors, productList } from "../constants";
type Props = {};

const ProductPage = (props: Props) => {
  const { productName } = useParams();
  const product = productList.find((p) => p.productName === productName);

  if (!product) {
    return <p>The requested product does not exist.</p>;
  }
  return (
    <>
      <div className="vw-100">
        <Link
          className="btn btn-info mb-2 text-white"
          to="/shop"
          style={{ marginTop: 50 }}
        >
          Back to Shop
        </Link>
      </div>
      <div className="card border-0 vw-100">
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
            style={{ maxWidth: "100%", height: "400px" }}
          />
          <p className="card-text">
            <li className="list-group-item">{product.description}</li>
            <li className="list-group-item">
              {product.quantityInStock > 0 ? "In stock" : "Out of stock"}
            </li>
            <li className="list-group-item">Price: {product.price}</li>
          </p>
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
    </>
  );
};

export default ProductPage;
