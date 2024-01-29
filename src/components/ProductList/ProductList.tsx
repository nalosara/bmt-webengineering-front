import { ChangeEvent, useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { Product } from "../../utils/types";
import { Modal, Button, Form } from "react-bootstrap";
import { useCreateProduct, useProducts } from "../../hooks";
import { Link } from "react-router-dom";
import { Colors } from "../../constants";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useWebSocket from "react-use-websocket";

type ProductListProps = {};

interface CustomJwtPayload extends JwtPayload {
  authorities?: string[];
}

const ProductList = ({}: ProductListProps) => {
  const { data, error, isLoading, isError, refetch } = useProducts();
  const createProduct = useCreateProduct();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [products, setProducts] = useState<Product[] | undefined | null>(data);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const userToken = localStorage.getItem("userToken");
  let decodedToken: CustomJwtPayload;
  let authorities: string[] | undefined;

  const socketUrl = `wss://bmtwebshop-3a305a901ea3.herokuapp.com/websocket?token=${userToken}`;
  //const socketUrl = `ws://localhost:8080/websocket?token=${userToken}`;
  const { sendJsonMessage } = useWebSocket(socketUrl);
  
  useEffect(() => {
    setProducts(data);
  }, [data]);
  
  if (userToken) {
    try {
      decodedToken = jwtDecode(userToken);
      authorities = decodedToken.authorities;
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

  const handleNewProductAdded = (newProduct: Product) => {
    if (newProduct && newProduct.name) {
      toast.success(`New product added: ${newProduct.name}`);
    } else {
      console.error("Invalid product data:", newProduct);
    }
  };
  

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();

    if (!searchTerm) {
      setProducts(data);
    } else {
      const filteredProducts =
        data?.filter((p) => p.name.toLowerCase().includes(searchTerm)) || null;

      setProducts(filteredProducts);
    }
  };

  const handleSubmit = (values: Product) => {
    if (values.quantityInStock >= 0 && values.price > 0) {
      setSubmitting(true);
  
      createProduct.mutate(values, {
        onSuccess: (values) => {
          const newProductMessage = {
            msgType: "new product added",
            values: values,
          };
          sendJsonMessage(newProductMessage);
          setSubmitting(false);
          handleAddModalClose();
        },
        onError: (error) => {
          setSubmitting(false);
          console.error("Error creating product:", error);
        },
      });
    } else {
      toast.error("Quantity in stock and price must be larger than 0.");
    }
  };

  useWebSocket(socketUrl, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
    onMessage: (m) => {
      try {
        const newMsg = JSON.parse(m.data);
        console.log(newMsg);
        if (newMsg && newMsg.msgType === "new product added" && newMsg.product) {
          const newProduct: Product = newMsg.product;
          handleNewProductAdded(newProduct);
        } else {
          console.error("Invalid message format or missing product data:", newMsg);
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    },
    onError: (e) => {
      console.error("error ", e);
    }
    
  });

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
          isLoading && (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )
        }
        {
        isError && (
          <div className="row vw-100">
            <div className="col-12 col-md-3 m-3">
              <div className="alert alert-danger" role="alert">
                <h4 className="alert-heading">Unable to render data!</h4>
                <p className="mb-0">Something went wrong, please try again.</p>
              </div>
            </div>
          </div>
        )}
        <div className="container-fluid row justify-content-center">
          {products?.map((product) => (
            <div key={product.id} className="col-12 col-md-3">
              <Link
                className="text-black"
                to={`/products/${product.id}`}
                style={{ textDecoration: "none", padding: 10 }}
              >
                <ProductCard product={product} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Modal show={isAddModalOpen} onHide={handleAddModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
            <Button
              variant="primary"
              type="submit"
              style={{ marginTop: 20 }}
              onClick={() => {
                handleSubmit(newProduct);
              }}
            >
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductList;
