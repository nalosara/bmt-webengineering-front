import { useState, useEffect } from "react";
import { Order } from "../../utils/types";
import { OrderService } from "../../services";
import { Link, useParams } from "react-router-dom";
import { JwtPayload, jwtDecode } from "jwt-decode";
import OrderCard from "../OrderCard";

type OrderListProps = {};

interface CustomJwtPayload extends JwtPayload {
  authorities?: string[];
}

const OrderList = (props: OrderListProps) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>();
  const { username } = useParams<{ username?: string }>();

  const userToken = localStorage.getItem("userToken");
  let decodedToken: CustomJwtPayload;
  let authorities: string[] | undefined;

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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        let username;
        if (userToken) {
          try {
            const decodedToken = jwtDecode(userToken);
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

  if (!orders || orders.length === 0) {
    return <p className="vw-100">You have not yet ordered anything!</p>;
  }
  return (
    <div className="container row vw-100 justify-content-center align-items-center">
      { userToken && authorities?.includes('MEMBER') && orders.map((order) => (
        <div key={order.id} className="col-12 col-md-3 vw-100">
          <Link
            className="text-black"
            to={
              `/orders/userByUsername/${username}`
            }
            style={{ textDecoration: "none" }}
          >
            <OrderCard order={order} />
          </Link>
        </div>
      ))}
      { userToken && authorities?.includes('ADMIN') && orders.map((order) => (
        <div key={order.id} className="col-12 col-md-3 vw-100">
          <Link
            className="text-black"
            to={
              `/orders/`
            }
            style={{ textDecoration: "none" }}
          >
            <OrderCard order={order} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
