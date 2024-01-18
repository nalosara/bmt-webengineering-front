import CartCard from "../../components/CartCard";
import { useState, useEffect } from "react";
import { Order } from "../../utils/types";
import { OrderService } from "../../services";
import { Link, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

type OrderListProps = {};

const OrderList = (props: OrderListProps) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>();
  const { username } = useParams<{ username?: string }>();

  const token = localStorage.getItem("userToken");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        let username;
        if (token) {
          try {
            const decodedToken = jwtDecode(token);
            console.log("Decoded Token:", decodedToken);
            username = decodedToken.sub;
          } catch (error) {
            console.error("Error decoding token:", error);
          }
        } else {
          console.error("Token is null or undefined. Cannot decode.");
        }

        if (username) {
          const ordersByUsername = await OrderService.getOrdersByUsername(
            username
          );
          setOrders(ordersByUsername);
        } else {
          console.error("Username is undefined");
        }
      } catch (error) {
        console.error("Error fetching order by username:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!orders) {
    return <p className="vw-100">You have not yet ordered anything!</p>;
  }
  return (
    <div className="container-fluid row">
      {orders.map((order) => (
        <div key={order.id} className="col-12 col-md-3 vw-100">
          <Link
            className="text-black"
            to={`/orders/userByUsername/${username}`}
            style={{ textDecoration: "none" }}
          >
            <CartCard order={order} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
