import { ChangeEvent, useState } from "react";
import { productList } from "../../constants";
import ProductCard from "../ProductCard/ProductCard";

type Props = {};

const ProductList = (props: Props) => {
  const [products, setProducts] = useState(productList);

  const search = (e: ChangeEvent<HTMLInputElement>) => {
    const filteredBooks = productList.filter((product) =>
      product.productName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setProducts(filteredBooks);
  };

  return (
    <>
      <div className="row justify-content-center align-items-center">
        <div className="col-12 col-md-4 mx-3 justify-content-center">
          <input
            type="text"
            className="form-control"
            onChange={search}
            placeholder="Search for a product..."
          ></input>
        </div>
      </div>
      <div className="row justify-content-center">
        {products.map((product, i) => (
          <ProductCard product={product} key={i} />
        ))}
      </div>
    </>
  );
};

export default ProductList;
