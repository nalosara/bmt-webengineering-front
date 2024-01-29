import { useNavigate } from "react-router-dom";
import { Order, User } from "../../utils/types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDeleteOrder } from "../../hooks";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { UserService } from "../../services";
import { Colors } from "../../constants";
import { format } from 'date-fns';

type OrderCardProps = {
  order: Order;
};

interface CustomJwtPayload extends JwtPayload {
  authorities?: string[];
}

const OrderCard = ({ order }: OrderCardProps) => {
  const userToken = localStorage.getItem("userToken");
  let authorities: string[] | undefined;
  const [user, setUser] = useState<User | undefined>(undefined);
  const navigate = useNavigate();
  const deleteOrder = useDeleteOrder();

  useEffect(() => {
    const fetchUser = async () => {
      if (!userToken) {
        console.error("Token is null or undefined. Cannot decode.");
        return;
      }

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
    };

    fetchUser();
  }, [userToken]);

  const handleDeleteOrder = (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (confirmDelete) {
      try {
        deleteOrder.mutate(id, {});
        toast.success("Order canceled successfully!");
        navigate(`/profile/${user?.username}`);
      } catch (error) {
        console.error("Error deleting order:", error);
        toast.success("Error canceling order!");
      }
    }
  };

  return (
    <>
      <div
        className="card border-0 shadow"
        style={{ borderRadius: 40, height: "100%" }}
      >
        
        <div
          className="card-header border-0"
          style={{ backgroundColor: "white", fontWeight: "bold", fontSize: 20 }}
        >
          {user?.userType.includes("ADMIN") ? (
            <>
              <span>ORDER FOR USER </span>
              <span style={{ color: Colors.secondary }}>{order.username} </span>
              <span>ORDERED ON </span>
              <span>{format(order.orderDate, 'dd.MM.yyyy')}</span>
            </>
          ) : (
            "YOUR ORDER"
          )}
        </div>
        <div>
            <img
              src={order.product.imageUrl}
              alt={order.product.name}
              className="img-fluid"
              style={{ maxWidth: "100%", height: "200px" }}
            />
          </div>
        <div className="card-body d-flex">
          
          <div className="card-text">
            <div
              className="card-header"
              style={{
                backgroundColor: "white",
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              {order.product.name}
            </div>
            <li className="list-group-item" style={{ marginTop: 10 }}>
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

        {user?.userType.includes("MEMBER") && (
          <a
            className="btn btn-primary btn-danger"
            onClick={() => handleDeleteOrder(order.id)}
          >
            Cancel order
          </a>
        )}
      </div>
    </>
  );
};

export default OrderCard;
