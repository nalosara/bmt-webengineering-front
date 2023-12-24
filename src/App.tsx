import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home, About, Shop, Login, NotFound, ProductPage, Profile } from "./pages"
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
    <Header />
    <Navbar />
    <Footer />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/product/:productName" element={<ProductPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  );
}

export default App;
