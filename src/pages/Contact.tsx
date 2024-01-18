import ContactCard from "../components/ContactCard";

type ContactProps = {};

const Contact = (props: ContactProps) => {
  return (
    <div className="col-12 justify-content-center align-items-center vw-100">
      <div className="container-fluid">
        <img
          src="src/assets/images/BeMyTECH-cropped.png"
          width="300"
          alt=""
          style={{ marginTop: 100 }}
        />
      </div>
      <ContactCard />
    </div>
  );
};

export default Contact;
