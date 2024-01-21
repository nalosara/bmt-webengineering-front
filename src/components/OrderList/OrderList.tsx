import { useState, useEffect } from "react";
import { Order } from "../../utils/types";
import { Link, useParams } from "react-router-dom";
import { JwtPayload, jwtDecode } from "jwt-decode";
import OrderCard from "../OrderCard";
import { useOrdersByUsername } from "../../hooks";

type OrderListProps = {};

const OrderList = (props: OrderListProps) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { username } = useParams<{ username?: string }>();
  const { data, error, isLoading, isError, refetch } = useOrdersByUsername(username || "");

  const userToken = localStorage.getItem("userToken");
  let decodedToken: JwtPayload;
  let authorities: string | undefined;

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

  // Update the orders state based on the fetched data
  useEffect(() => {
    if (data) {
      setOrders(data);
    }
  }, [data]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Use data instead of orders to check if the user has not ordered anything
  if (!data || data.length === 0) {
    return <p className="vw-100">You have not yet ordered anything!</p>;
  }

  return (
    <div className="container row vw-100 justify-content-center align-items-center">
      {userToken && authorities.includes('MEMBER') && orders.map((order) => (
        <div key={order.id} className="col-12 col-md-3 vw-100">
          <Link
            className="text-black"
            to={`/orders/userByUsername/${username}`}
            style={{ textDecoration: "none" }}
          >
            <OrderCard order={order} />
          </Link>
        </div>
      ))}
      {userToken && authorities.includes('ADMIN') && orders.map((order) => (
        <div key={order.id} className="col-12 col-md-3 vw-100">
          <Link
            className="text-black"
            to={`/orders/`}
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
