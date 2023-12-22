import { Colors } from "../../constants";

type CartCardProps = {};

const CartCard = (props: CartCardProps) => {
  return (
    <div className="col-12 m-3">
      <div className="card border-0 shadow-sm w-100">
        <div
          className="card-header"
          style={{ backgroundColor: "white", fontWeight: "bold" }}
        >
          Your order
        </div>
        <div className="card-body">
          <p className="card-text d-flex align-items-center">
            <div className="row">
              <div className="col">
                <li className="list-group-item">Product name: BeMyStep</li>
              </div>
              <div className="col">
                <li className="list-group-item">Quantity: 2</li>
              </div>
              <div className="col">
                <li className="list-group-item">
                  Shipped to: Francuske revolucije bb
                </li>
              </div>
            </div>
          </p>
          <a className="btn btn-primary" style={{ backgroundColor: Colors.primary, borderColor: Colors.primary}}>Cancel Order</a>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
