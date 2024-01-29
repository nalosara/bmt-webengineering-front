import { useState, useEffect } from "react";
import { Order, User } from "../../utils/types";
import { OrderService, UserService } from "../../services";
import { JwtPayload, jwtDecode } from "jwt-decode";
import OrderCard from "../OrderCard";
import { useOrders } from "../../hooks";

type OrderListProps = {};

interface CustomJwtPayload extends JwtPayload {
  authorities?: string[];
}

const OrderList = (props: OrderListProps) => {
  const [orderByUsername, setOrderByUsername] = useState<Order[]>([]);
  const { data: orders, error, isLoading, isError, refetch } = useOrders();
  const [user, setUser] = useState<User | undefined>(undefined);
  const userToken = localStorage.getItem("userToken");

  useEffect(() => {
    const fetchUser = async () => {
      if (!userToken) {
        console.error("Token is null or undefined. Cannot decode.");
        return;
      }

      try {
        const decodedToken: CustomJwtPayload = jwtDecode(userToken);
        const fetchedUser = await UserService.getUserByUsername(decodedToken.sub || "");

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.username && user?.userType === 'MEMBER') {
          const ordersByUsername = await OrderService.getOrdersByUsername(user.username);
          setOrderByUsername(ordersByUsername);
        } else if(!user?.username) {
          console.log("Username is not defined")
        }
      } catch (error) {
        console.error("Error fetching order by username:", error);
      }
    };

    if (user && user.username) {
      fetchData();
    }
  }, [user, orders, orderByUsername]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container-fluid row justify-content-center" style={{ marginBottom: 50 }}>
      {user && user.userType && user.userType.includes("ADMIN") ? (
        orders?.map((order) => (
          <div key={order.id} className="col-12 col-md-3 disabled-link" style={{ marginBottom: 20 }}>
            <OrderCard order={order} />
          </div>
        ))
      ) : (
        orderByUsername.map((orderByUser) => (
          <div key={orderByUser.id} className="col-12 col-md-3 " style={{ marginBottom: 20 }}>
            <OrderCard order={orderByUser} />
          </div>
        ))
      )}
    </div>
  );
};

export default OrderList;
