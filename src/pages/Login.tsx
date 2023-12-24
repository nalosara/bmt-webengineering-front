type LoginProps = {};

const Login = (props: LoginProps) => {
  return (
    <div className="col-12 justify-content-center align-items-center vw-100">
      <div className="container-fluid">
        <img src="src/assets/images/BeMyTECH-cropped.png" width="300" alt="" style={{ marginTop: 100}}/>
      </div>
      <div className="container d-flex justify-content-center align-items-center">
        <div className="card border-0">
          <form>
            <div className="mb-3">
              <label className="form-label">
                <strong>Email:</strong>
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="example@email.com"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Password:</strong>
              </label>
              <input
                type="password"
                placeholder="********"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
