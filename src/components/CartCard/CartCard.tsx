import { Order } from "../../utils/types";

type CartCardProps = {
  order: Order;
};

const CartCard = ({ order }: CartCardProps) => {
  return (
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
          <a className="btn btn-danger">Cancel</a>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
