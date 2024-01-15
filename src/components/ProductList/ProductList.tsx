import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { Product } from "../../utils/types";
import { ProductService } from "../../services";
import { Colors } from "../../constants";
import { Link } from "react-router-dom";

type ProductListProps = {};

const ProductList = (props: ProductListProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>();

  //const search = (e: ChangeEvent<HTMLInputElement>) => {
  //const filteredProducts = productList.filter(product =>
  // product.productName.toLowerCase().includes(e.target.value.toLowerCase())
  // );
  //setProducts(filteredProducts);
  //};

  useEffect(() => {
    setIsLoading(true);
    ProductService.getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container-fluid vw-100">
      <div className="col-12 row justify-content-center align-items-center">
        <div className="col-12 col-md-4 mx-3">
          <div className="col">
            <input
              type="text"
              className="form-control"
              //onChange={search}
              placeholder="Search for a product..."
            ></input>
            <a
              className="btn btn-primary"
              style={{
                backgroundColor: Colors.tertiary,
                borderColor: Colors.tertiary,
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              Add Product
            </a>
          </div>
        </div>
      </div>
      {
        // Loading data
        isLoading && (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )
      }
      {
        // Handle errors
        error && (
          <div className="row">
            <div className="col-12 col-md-3 m-3">
              <div className="alert alert-danger" role="alert">
                <h4 className="alert-heading">Unable to render data!</h4>
                <p>{error?.response?.data?.message || error?.message}</p>
                <hr />
                <p className="mb-0">Something went wrong, please try again.</p>
              </div>
            </div>
          </div>
        )
      }
      {
        // If not loading, and not error, show data
        !isLoading && (
          <div className="container-fluid">
            <div className="row justify-content-center">
              {products.map((product) => (
                <div key={product.id} className="col-12 col-md-3">
                  <Link
                    className=" text-black"
                    to={`/products/${product.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <ProductCard product={product} />
                  </Link>
                </div>
              ))
              }
            </div>
          </div>
        )
      }
    </div>
  );
};

export default ProductList;
