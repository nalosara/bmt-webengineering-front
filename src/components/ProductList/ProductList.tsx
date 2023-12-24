import { ChangeEvent, useState } from "react";
import { productList } from "../../constants";
import ProductCard from "../ProductCard/ProductCard";

type ProductListProps = {};

const ProductList = (props: ProductListProps) => {
  const [products, setProducts] = useState(productList);

  const search = (e: ChangeEvent<HTMLInputElement>) => {
    const filteredBooks = productList.filter((product) =>
      product.productName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setProducts(filteredBooks);
  };

  return (
    <div className="container-fluid vw-100">
      <div className="col-12 row justify-content-center align-items-center">
        <div className="col-12 col-md-4 mx-3 justify-content-center">
          <input
            type="text"
            className="form-control"
            onChange={search}
            placeholder="Search for a product..."
          ></input>
        </div>
      </div>
      <div className="container-fluid">
        <div
          className="row justify-content-center"
        >
          {products.map((product, i) => (
            <ProductCard product={product} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
