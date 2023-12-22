import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home, About, Shop, Login, NotFound } from "./pages"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
