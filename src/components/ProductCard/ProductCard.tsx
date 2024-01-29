import { Product } from "../../utils/types";

type ProductProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductProps) => {
  return (
    <>
      <div className="card border-0 shadow" style={{ borderRadius: 40 }}>
      <img
            src={ product.imageUrl }
            alt={ product.name }
            className="img-fluid"
            style={{ maxWidth: "100%", height: "200px" }}
          />
        <div
          className="card-header"
          style={{ backgroundColor: "white", fontWeight: "bold" }}
        >
          { product.name }
        </div>
        <div className="card-body">
          
          <p className="card-text">
            <li className="list-group-item">
              {product.quantityInStock > 0 ? "In stock" : "Out of stock"}
            </li>
            <li className="list-group-item"><strong>Price:</strong> ${product.price}</li>
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
