import { ChangeEvent, useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { Product } from "../../utils/types";
import { Modal, Button, Form } from "react-bootstrap";
import { useCreateProduct, useProducts } from "../../hooks";
import { Link } from "react-router-dom";
import { Colors } from "../../constants";
import { jwtDecode, JwtPayload } from "jwt-decode";

type ProductListProps = {};

interface CustomJwtPayload extends JwtPayload {
  authorities?: string[];
}


const ProductList = (props: ProductListProps) => {
  const { data, error, isLoading, isError, refetch } = useProducts();
  const createProduct = useCreateProduct();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [products, setProducts] = useState<Product[] | null | undefined>(data || null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const userToken = localStorage.getItem("userToken");
  let decodedToken: CustomJwtPayload;
  let authorities: string[] | undefined;

  useEffect(() => {
    // Fetch products on component mount
    refetch();
  }, [refetch]);

  if (userToken) {
    try {
      decodedToken = jwtDecode(userToken);
      authorities = decodedToken.authorities;
      console.log("Decoded Token:", decodedToken);
      console.log("Authorities: ", authorities);
      console.log("username: ", decodedToken.sub);
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  } else {
    console.error("Token is null or undefined. Cannot decode.");
  }

  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    description: "",
    imageUrl: "",
    quantityInStock: 0,
    price: 0.0,
  });

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setProduct({
      id: "",
      name: "",
      description: "",
      imageUrl: "",
      quantityInStock: 0,
      price: 0.0,
    });
    setIsAddModalOpen(false);
  };

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (values: Product) => {
    setSubmitting(true);
    console.log("THE VALUES ARE ", values);
  
    createProduct.mutate(values, {
      onSuccess: () => {
        setSubmitting(false);
        handleAddModalClose();
      },
      onError: (error) => {
        setSubmitting(false);
        // Handle the error, e.g., display an error message to the user
        console.error("Error creating product:", error);
      },
    });
  };

 // SEARCH
const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
  const searchTerm = e.target.value.toLowerCase();

  if (!searchTerm) {
    // If the search term is empty, show all products
    setProducts(data || null);
  } else {
    // If there is a search term, filter the products
    const filteredProducts = data?.filter(p => p.name.toLowerCase().includes(searchTerm)) || null;
    
    console.log("Filtered Products:", filteredProducts);

    // Update the state with filtered products or null if none found
    setProducts(filteredProducts);
  }
};


  

    return (
      <>
        <div className="container-fluid vw-100">
          <div className="col-12 row justify-content-center align-items-center">
            <div className="col-12 col-md-4 mx-3">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  onChange={handleSearch}
                  placeholder="Search for a product..."
                ></input>
                {userToken && authorities?.includes("ADMIN") && (
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
                )}
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
          {/*// Handle errors
        error && (
          <div className="row vw-100">
            <div className="col-12 col-md-3 m-3">
              <div className="alert alert-danger" role="alert">
                <h4 className="alert-heading">Unable to render data!</h4>
                <p>{error?.response?.data?.message || error?.message}</p>
                <hr />
                <p className="mb-0">Something went wrong, please try again.</p>
              </div>
            </div>
          </div>
        )*/}
          {!isLoading && (
            <div className="container-fluid">
              <div className="row justify-content-center">
                {products?.map((product) => (
                  <div key={product.id} className="col-12 col-md-3">
                    <Link
                      className=" text-black"
                      to={`/products/${product.id}`}
                      style={{ textDecoration: "none", margin: 10 }}
                    >
                      <ProductCard product={product} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <Modal show={isAddModalOpen} onHide={handleAddModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Add form */}
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                
              }}
            >
              <Form.Group controlId="addName">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="addDescription">
                <Form.Label>Description:</Form.Label>
                <Form.Control
                  type="text"
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="addImageUrl">
                <Form.Label>ImageUrl:</Form.Label>
                <Form.Control
                  type="text"
                  value={newProduct.imageUrl}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, imageUrl: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="addQuantityInStock">
                <Form.Label>Quantity in stock:</Form.Label>
                <Form.Control
                  type="number"
                  value={newProduct.quantityInStock}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      quantityInStock: parseInt(e.target.value, 10),
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="addPrice">
                <Form.Label>Price:</Form.Label>
                <Form.Control
                  type="number"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      price: parseFloat(e.target.value),
                    })
                  }
                />
              </Form.Group>
              <Button variant="primary" type="submit" style={{ marginTop: 20 }} onClick={() => {handleSubmit(newProduct)}}>
                Add
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  };
  
export default ProductList;
