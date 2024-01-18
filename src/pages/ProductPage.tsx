import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Product } from "../utils/types";
import { ProductService } from "../services";
import { Colors } from "../constants";
import { Modal, Button, Form } from 'react-bootstrap';

type Props = {};

const ProductPage = (props: Props) => {
  const { id } = useParams<{ id?: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>The requested product does not exist.</p>;
  }

  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {
      try {
        await ProductService.deleteProductById(product.id);
        // Optionally, you can update the UI or perform other actions after deletion
      } catch (error) {
        // Handle errors (e.g., display an error message to the user)
        console.error("Error deleting product:", error);
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
      // Extract updated values from form fields
      const updatedName = (e.currentTarget.elements.namedItem("editName") as HTMLInputElement)?.value!;
      const updatedDescription = (e.currentTarget.elements.namedItem("editDescription") as HTMLInputElement)?.value!;
      const updatedImageUrl = (e.currentTarget.elements.namedItem("editImageUrl") as HTMLInputElement)?.value!;
      const updatedQuantityInStock = parseInt((e.currentTarget.elements.namedItem("editQuantityInStock") as HTMLInputElement)?.value!, 10);
      const updatedPrice = parseFloat((e.currentTarget.elements.namedItem("editPrice") as HTMLInputElement)?.value!);
  
      // Check if any required field is missing or invalid
      if (!updatedName || !updatedDescription || !updatedImageUrl || isNaN(updatedQuantityInStock) || isNaN(updatedPrice)) {
        console.error('Invalid form input. Please fill in all fields with valid values.');
        return;
      }
  
      // Add logic to handle form submission and update the product
      if (product) {
        const updatedProduct = await ProductService.updateProduct(product);
  
        if (updatedProduct) {
          // Optionally, you can update the UI or perform other actions after updating
          console.log('Product updated successfully:', updatedProduct);
        } else {
          console.error('Invalid updated product data received:', updatedProduct);
          // Handle the case where the updated product data is invalid
        }
      }
    } catch (error) {
      // Handle errors (e.g., display an error message to the user)
      console.error('Error updating product:', error);
    } finally {
      setIsEditModalOpen(false); // Close the modal after submission or in case of an error
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
            <li className="list-group-item"><strong>Description: </strong>{product.description}</li>
            <li className="list-group-item">
              {product.quantityInStock > 0 ? "In stock" : "Out of stock"}
            </li>
            <li className="list-group-item"><strong>Price: </strong> ${product.price}</li>
          </p>
          <a
            className="btn btn-primary"
            style={{
              backgroundColor: Colors.tertiary,
              borderColor: Colors.tertiary,
            }}
          >
            Buy
          </a>
          <a
            className="btn btn-primary"
            style={{
              backgroundColor: Colors.tertiary,
              borderColor: Colors.tertiary,
              marginLeft: 20
            }}
          >
            Add to cart
          </a>
        </div>
      </div>
      <div className="vw-100">
        <a className="btn btn-primary btn-danger" onClick={handleDeleteClick}>
          <i className="bi bi-trash"></i>
        </a>
        <a
          className="btn btn-success"
          style={{
            marginLeft: 20
          }}
          onClick={handleEditClick}
        >
          <i className="bi bi-pencil"></i>
        </a>
      </div>

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
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="editDescription">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                type="text"
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="editImageUrl">
              <Form.Label>ImageUrl:</Form.Label>
              <Form.Control
                type="text"
                value={product.imageUrl}
                onChange={(e) => setProduct({ ...product, imageUrl: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="editQuantityInStock">
              <Form.Label>Quantity in stock:</Form.Label>
              <Form.Control
                type="number"
                value={product.quantityInStock}
                onChange={(e) => setProduct({ ...product, quantityInStock: parseInt(e.target.value, 10) })}
              />
            </Form.Group>
            <Form.Group controlId="editPrice">
              <Form.Label>Price:</Form.Label>
              <Form.Control
                type="number"
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
              />
            </Form.Group>
            <Button variant="primary" type="submit" style={{marginTop: 20}}>
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductPage;
