
type HomeProps = {};

const Home = ({}: HomeProps) => {
  return (
    <div
      className="container-fluid p-0 vw-100"
      style={{
        marginTop: 50,
      }}
    >
      <section className="py-5 container-fluid ">
        <div className="container">
          <div className="row align-items-center py-5">
            <div className="col-md-8 text-black">
              <h2 style={{ marginBottom: 20 }}>Welcome to <strong>BeMyTECH</strong></h2>
              <p>
                At BeMyTECH, we believe in a world where technology is inclusive
                and accessible to everyone. We are dedicated to designing and
                manufacturing innovative products that empower individuals with
                diverse needs, including those facing visual challenges. Our
                mission is to bridge the gap between people and technology,
                enabling seamless integration and enhanced experiences.
              </p>
              <p>
                Join us as we revolutionize accessibility and empower
                individuals to navigate the digital world confidently and
                independently. Explore our website, connect with us, and
                discover the possibilities that BeMyTECH can unlock for you.
              </p>
            </div>
            <div className="col-md-4">
              <img
                src="/images/BeMyTECH-logo-cropped.png"
                width="350"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container-fluid vw-100">
        <div className="container text-black">
          <h2 style={{ textAlign: "center", marginTop: 30 }}>
            FEATURED PRODUCTS
          </h2>
          <div className="row py-5">
            <div className="col-md-4">
              <img
                src="/images/logo_2.png.png"
                width="250"
                alt="About Hero"
              />
            </div>
            <div className="col-md-8 text-black">
              <p>
                At BeMyStep, Our mission is to provide innovative and accessible
                technology solutions that improve lives of visually impaired
                individuals. We are dedicated to creating a world where visually
                impaired individuals have equal opportuinities to fully
                participate in society.
              </p>
              <p>
                Through a commitment to continuous innovation and user-centered
                design, we strive to deliver products that are intuitive,
                reliable and empowering. Our ultimate goal is to break down
                barriers that exist between the visually impaired and the world,
                empowering them to achieve their full potential and live life on
                their own terms.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
