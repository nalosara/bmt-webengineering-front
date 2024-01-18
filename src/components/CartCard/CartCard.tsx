import { OrderService } from "../../services";
import { Order } from "../../utils/types";

type CartCardProps = {
  order: Order;
};

const CartCard = ({ order }: CartCardProps) => {

  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (confirmDelete) {
      try {
        await OrderService.deleteOrderById(order.id);
        // Optionally, you can update the UI or perform other actions after deletion
      } catch (error) {
        // Handle errors (e.g., display an error message to the user)
        console.error("Error deleting order:", error);
      }
    }
  };


  return (
    <>
      <div className="col-12 m-3">
        <div className="card border-0 shadow" style={{ borderRadius: 40 }}>
          <div
            className="card-header"
            style={{ backgroundColor: "white", fontWeight: "bold" }}
          >
            Your order
          </div>
          <div className="card-body justify-content-center align-items-center">
            <p className="card-text">
              <div className="row">
                <div className="col">
                  <li className="list-group-item">
                    <strong>Product:</strong>
                    {order.products.map((orderedProduct) => (
                      <p key={orderedProduct.product.id}>
                        {orderedProduct.product.name}
                      </p>
                    ))}
                  </li>
                </div>
                <div className="col">
                  <li className="list-group-item">
                    <strong>Quantity:</strong>
                    {order.products.map((orderedProduct) => (
                      <p key={orderedProduct.product.id}>
                        {orderedProduct.quantity}
                      </p>
                    ))}
                  </li>
                </div>
                <div className="col">
                  <li className="list-group-item">
                    <strong>Shipped to:</strong> {order.address}
                  </li>
                </div>
              </div>
            </p>
            <a className="btn btn-danger" onClick={handleDeleteClick}>
              Cancel
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartCard;
