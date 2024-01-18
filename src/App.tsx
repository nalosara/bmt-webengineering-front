import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
  Home,
  About,
  Shop,
  Login,
  Registration,
  NotFound,
  ProductPage,
  Profile,
} from "./pages";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./utils/ProtectedRoute";
import { configureAxiosInterceptors } from "./services/appAxios.interceptors";

function App() {
  configureAxiosInterceptors();
  return (
    <>
      <Header />
      <Navbar />
      <Footer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile/:username" element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
