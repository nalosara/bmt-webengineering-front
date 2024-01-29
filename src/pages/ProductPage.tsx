import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Order, Product, User } from "../utils/types";
import { ProductService, UserService } from "../services";
import { Colors } from "../constants";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useCreateOrder, useDeleteProduct, useUpdateProduct } from "../hooks";

type Props = {};

interface CustomJwtPayload extends JwtPayload {
  authorities?: string[];
}

const ProductPage = ({}: Props) => {
  let authorities: string[] | undefined;
  const { id } = useParams<{ id?: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderQuantity, setOrderQuantity] = useState<number>(1);
  const [orderAddress, setOrderAddress] = useState<string>("");
  const [user, setUser] = useState<User | undefined>(undefined);
  const navigate = useNavigate();

  const deleteProduct = useDeleteProduct();
  const createOrder = useCreateOrder();
  const updateProduct = useUpdateProduct();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        if (id) {
          const productById = await ProductService.getProductById(id);

          if (productById) {
            setProduct(productById);
          } else {
            console.error("Product not found");
          }
        } else {
          console.error("ID is undefined");
        }
      } catch (error) {
        console.error("Error fetching product by ID:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const userToken = localStorage.getItem("userToken");

  useEffect(() => {
    const fetchUser = async () => {
      if (userToken) {
        try {
          const decodedToken: CustomJwtPayload = jwtDecode(userToken);
          authorities = decodedToken.authorities;

          const fetchedUser = await UserService.getUserByUsername(
            decodedToken.sub || ""
          );

          if (fetchedUser !== null) {
            setUser(fetchedUser);
          } else {
            console.error("User not found for the decoded token.");
          }
        } catch (error) {
          console.error("Error decoding token or fetching user:", error);
        }
      } else {
        console.error("Token is null or undefined. Cannot decode.");
      }
    };

    fetchUser();
  }, [userToken]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>The requested product does not exist.</p>;
  }

  const handleDeleteClick = (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      try {
        deleteProduct.mutate(id);
        navigate("/shop");
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const updatedName = (
        e.currentTarget.elements.namedItem("editName") as HTMLInputElement
      )?.value!;
      const updatedDescription = (
        e.currentTarget.elements.namedItem(
          "editDescription"
        ) as HTMLInputElement
      )?.value!;
      const updatedImageUrl = (
        e.currentTarget.elements.namedItem("editImageUrl") as HTMLInputElement
      )?.value!;
      const updatedQuantityInStock = parseInt(
        (
          e.currentTarget.elements.namedItem(
            "editQuantityInStock"
          ) as HTMLInputElement
        )?.value!,
        10
      );
      const updatedPrice = parseFloat(
        (e.currentTarget.elements.namedItem("editPrice") as HTMLInputElement)
          ?.value!
      );

      if (
        !updatedName ||
        !updatedDescription ||
        !updatedImageUrl ||
        isNaN(updatedQuantityInStock) ||
        isNaN(updatedPrice)
      ) {
        console.error(
          "Invalid form input. Please fill in all fields with valid values."
        );
        return;
      }

      if (product) {
        const updatedProduct = await updateProduct.mutateAsync(product);

        if (updatedProduct) {
          console.log("Product updated successfully:", updatedProduct);
          toast.success("Product updated successfully!");
        } else {
          console.error(
            "Invalid updated product data received:",
            updatedProduct
          );
          toast.error("Error updating product. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Error updating product. Please try again.");
    } finally {
      setIsEditModalOpen(false);
    }
  };

  const handleOrderModalOpen = () => {
    setIsOrderModalOpen(true);
  };

  const handleOrderModalClose = () => {
    setIsOrderModalOpen(false);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(e.target.value, 10);
    setOrderQuantity(isNaN(quantity) ? 1 : quantity);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderAddress(e.target.value);
  };

  const handlePlaceOrder = async () => {
    try {
      if (user && user.userType.includes("MEMBER") && product) {
        if (orderQuantity > product.quantityInStock) {
          toast.error("Cannot order more items than available in stock!");
          return;
        }
        const order: Order = {
          id: "",
          userId: user?.id || "",
          username: user?.username || "",
          product: product,
          quantity: orderQuantity,
          address: orderAddress,
          orderDate: new Date(),
        };

        const addedOrder = await createOrder.mutateAsync(order);

        if (addedOrder) {
          const updatedProduct = {
            ...product,
            quantityInStock: product.quantityInStock - orderQuantity,
          };
          await updateProduct.mutateAsync(updatedProduct);
          toast.success("Order placed successfully!");
          handleOrderModalClose();
          navigate("/shop");
        } else {
          console.error("Invalid added order data received:", addedOrder);
          toast.error("Error placing order. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Error placing order. Please try again.");
    }
  };

  return (
    <>
      <div className="vw-100">
        <Link
          className="btn btn-info mb-2 text-white"
          to="/shop"
          style={{ marginTop: 100 }}
        >
          Back to Shop
        </Link>
      </div>
      <div className="card border-0 vw-100">
        <div
          className="card-header h2"
          style={{ backgroundColor: "white", fontWeight: "bold" }}
        >
          {product.name}
        </div>
        <div className="card-body">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="img-fluid"
            style={{ maxWidth: "100%", height: "400px" }}
          />
          <p className="card-text">
            <li className="list-group-item" style={{ marginTop: 20 }}>
              <strong>Description: </strong>
              {product.description}
            </li>
            <li className="list-group-item" style={{ marginTop: 20 }}>
              {product.quantityInStock > 0 ? "In stock" : "Out of stock"}
            </li>
            <li className="list-group-item" style={{ marginTop: 20 }}>
              <strong>Price: </strong> ${product.price}
            </li>
          </p>
          {userToken && user?.userType.includes("MEMBER") && (
            <>
              <a
                className="btn btn-primary"
                onClick={
                  product?.quantityInStock === 0
                    ? undefined
                    : handleOrderModalOpen
                }
                style={{
                  backgroundColor: Colors.tertiary,
                  borderColor: Colors.tertiary,
                  cursor:
                    product?.quantityInStock === 0 ? "not-allowed" : "pointer",
                  opacity: product?.quantityInStock === 0 ? 0.5 : 1,
                }}
              >
                Order
              </a>
            </>
          )}
        </div>
      </div>
      {userToken && user?.userType.includes("ADMIN") && (
        <div className="vw-100">
          <a
            className="btn btn-primary btn-danger"
            onClick={() => {
              handleDeleteClick(product.id);
            }}
          >
            <i className="bi bi-trash"></i>
          </a>
          <a
            className="btn btn-success"
            style={{
              marginLeft: 20,
            }}
            onClick={handleEditClick}
          >
            <i className="bi bi-pencil"></i>
          </a>
        </div>
      )}

      <Modal show={isEditModalOpen} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group controlId="editName">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="editDescription">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                type="text"
                value={product.description}
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="editImageUrl">
              <Form.Label>ImageUrl:</Form.Label>
              <Form.Control
                type="text"
                value={product.imageUrl}
                onChange={(e) =>
                  setProduct({ ...product, imageUrl: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="editQuantityInStock">
              <Form.Label>Quantity in stock:</Form.Label>
              <Form.Control
                type="number"
                value={product.quantityInStock}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    quantityInStock: parseInt(e.target.value, 10),
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="editPrice">
              <Form.Label>Price:</Form.Label>
              <Form.Control
                type="number"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: parseFloat(e.target.value) })
                }
              />
            </Form.Group>
            <Button variant="primary" type="submit" style={{ marginTop: 20 }}>
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={isOrderModalOpen} onHide={handleOrderModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Place Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="orderQuantity">
              <Form.Label>Quantity:</Form.Label>
              <Form.Control
                type="number"
                value={orderQuantity}
                onChange={handleQuantityChange}
              />
            </Form.Group>
            {orderQuantity > product.quantityInStock && (
              <div style={{ color: "red" }}>
                Cannot order more items than available in stock! There is only {product.quantityInStock} products left!
              </div>
            )}
            <Form.Group controlId="orderAddress">
              <Form.Label>Address:</Form.Label>
              <Form.Control
                type="text"
                value={orderAddress}
                onChange={handleAddressChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleOrderModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePlaceOrder}>
            Place Order
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductPage;
