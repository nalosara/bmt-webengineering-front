type AboutProps = {};

const About = (props: AboutProps) => {
  return (
    <div className="container-fluid p-0 vw-100" style={{ marginTop: 50 }}>
      <section className="container-fluid py-5 vw-100">
        <div className="container">
          <div className="row align-items-center py-5">
            <div className="col-md-8 text-black">
              <h1>About Us</h1>
              <p>
                With an application that will be connected to it, our smart
                device is offered as a suggested solution for those who are
                blind and visually impaired. People will become more independent
                as a result of it because they won't constantly need assistance
                from others. The smart device attached to a white cane and app
                will be able to identify obstacles and make getting around
                easier.
              </p>
            </div>
            <div className="col-md-4">
              <img
                src="src/assets/images/Cane_and_box_demo-removebg-preview.png"
                width="350"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
      <section className="container-fluid py-5 vw-100">
        <div className="container-fluid vw-100">
          <div className="container text-black">
            <h3>OUR TEAM</h3>
          </div>

          <div className="container-fluid vw-100">
            <div className="row align-items-center py-5 text-center">
              <div
                className="col-lg-3 col-md-6 d-flex align-items-stretch ms-auto"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="container">
                  <div className="member-img">
                    <img
                      src="src/assets/images/stylish-confident-businesswoman-smiling.jpg"
                      className="img-fluid shadow"
                      alt=""
                      style={{ borderRadius: 15}}
                    />
                    <div className="social" style={{ marginTop: 20 }}>
                      <a href="">
                        <i className="bi bi-facebook m-2"></i>
                      </a>
                      <a href="">
                        <i className="bi bi-linkedin m-2"></i>
                      </a>
                    </div>
                  </div>
                  <div className="text-black">
                    <h4>Selma Budnjo</h4>
                  </div>
                </div>
              </div>

              <div
                className="col-lg-3 col-md-6 d-flex align-items-stretch ms-auto"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="container">
                  <div className="member-img">
                    <img
                      src="src/assets/images/smiling-confident-businesswoman-posing-with-arms-folded.jpg"
                      className="img-fluid shadow"
                      alt=""
                      style={{ borderRadius: 15 }}
                    />
                    <div className="social" style={{ marginTop: 20 }}>
                      <a href="">
                        <i className="bi bi-facebook m-2"></i>
                      </a>
                      <a href="">
                        <i className="bi bi-linkedin m-2"></i>
                      </a>
                    </div>
                  </div>
                  <div className="text-black">
                    <h4>Sara Nalo</h4>
                  </div>
                </div>
              </div>

              <div
                className="col-lg-3 col-md-6 d-flex align-items-stretch ms-auto"
                style={{ marginRight: 100 }}
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="container">
                  <div className="member-img">
                    <img
                      src="src/assets/images/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair.jpg"
                      className="img-fluid shadow"
                      alt=""
                      style={{ borderRadius: 15 }}
                    />
                    <div className="social" style={{ marginTop: 20 }}>
                      <a href="">
                        <i className="bi bi-facebook m-2"></i>
                      </a>
                      <a href="">
                        <i className="bi bi-linkedin m-2"></i>
                      </a>
                    </div>
                  </div>
                  <div className="text-black">
                    <h4>Melisa Mutapcic</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
