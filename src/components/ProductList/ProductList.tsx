import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { Product } from "../../utils/types";
import { ProductService } from "../../services";
import { Colors } from "../../constants";
import { Link } from "react-router-dom";
import { Modal, Button, Form } from 'react-bootstrap';

type ProductListProps = {};

const ProductList = (props: ProductListProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    description: "",
    imageUrl: "",
    quantityInStock: 0,
    price: 0.0
  });

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
  };

  const handleAddSubmit = async (newProduct: Product) => {
    try {
      // Add logic to handle form submission and add the new product
      const addedProduct = await ProductService.addProduct(newProduct);

      if (addedProduct) {
        console.log('Product added successfully:', addedProduct);
      } else {
        console.error('Invalid added product data received:', addedProduct);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      setIsAddModalOpen(false);
    }
  };

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
    <>
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
              onClick={handleAddClick}
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

    <Modal show={isAddModalOpen} onHide={handleAddModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add form */}
          <Form onSubmit={(e) => {
            e.preventDefault();
            handleAddSubmit(newProduct);
          }}>
            <Form.Group controlId="addName">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="addDescription">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                type="text"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="addImageUrl">
              <Form.Label>ImageUrl:</Form.Label>
              <Form.Control
                type="text"
                value={newProduct.imageUrl}
                onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="addQuantityInStock">
              <Form.Label>Quantity in stock:</Form.Label>
              <Form.Control
                type="number"
                value={newProduct.quantityInStock}
                onChange={(e) => setNewProduct({ ...newProduct, quantityInStock: parseInt(e.target.value, 10) })}
              />
            </Form.Group>
            <Form.Group controlId="addPrice">
              <Form.Label>Price:</Form.Label>
              <Form.Control
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
              />
            </Form.Group>
            <Button variant="primary" type="submit" style={{ marginTop: 20 }}>
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
        </>
  );
};

export default ProductList;
