import { Order } from "../../utils/types";
import "react-toastify/dist/ReactToastify.css";
import { useDeleteOrder, useOrdersByUsername } from "../../hooks";

type OrderCardProps = {
  order: Order;
};

const OrderCard = ({ order }: OrderCardProps) => {
  let username;

  const deleteOrder = useDeleteOrder();
  const { data, error, isLoading, isError, refetch } = useOrdersByUsername(username || "");

  console.log(data);

  const handleDeleteOrder = async (id: string) => {
    try {
      await deleteOrder.mutateAsync(id);
      refetch();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <>
      <div
        className="card border-0 shadow justify-content-center align-items-center"
        style={{ borderRadius: 40, margin: 10 }}
      >
        <div
          className="card-header border-0"
          style={{ backgroundColor: "white", fontWeight: "bold", fontSize: 20 }}
        >
          YOUR ORDER
        </div>
        <div className="card-body d-flex" >
        
          <div style={{ marginRight: "20px" }}>
            <img
              src={data?.product}
              alt={order.product.name}
              className="img-fluid"
              style={{ maxWidth: "100%", height: "200px" }}
            />
          </div>
          <div className="card-text">
          <div
          className="card-header"
          style={{ backgroundColor: "white", fontWeight: "bold", fontSize: 20 }}
        >
          {order.product.name}
        </div>
            <li className="list-group-item">
              <strong>Description:</strong> {order.product.description}
            </li>
            <li className="list-group-item" style={{ marginTop: 10 }}>
              <strong>Price:</strong> ${order.product.price}
            </li>
            <li className="list-group-item" style={{ marginTop: 10 }}>
              <strong>Shipped to:</strong> {order.address}
            </li>
            <li className="list-group-item" style={{ marginTop: 10 }}>
              <strong>Total amount:</strong> $
              {order.product.price * order.quantity}
            </li>
          </div>
          
        </div>
        <a className="btn btn-primary btn-danger" onClick={() => {handleDeleteOrder(order.id)}}>
             Cancel order
          </a>
      </div>
    </>
  );
};

export default OrderCard;
