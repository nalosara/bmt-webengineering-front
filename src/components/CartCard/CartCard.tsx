type CartCardProps = {};

const CartCard = (props: CartCardProps) => {
  return (
    <div className="col-12 m-3">
      <div className="card border-0 shadow-sm ">
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
          <a className="btn btn-primary" style={{ backgroundColor: "danger", borderColor: "red" }}>Cancel</a>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
