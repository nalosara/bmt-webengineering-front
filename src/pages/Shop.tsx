import ProductList from "../components/ProductList";
import { BASE_URL } from "../constants";

type ShopProps = {};

const Shop = ({}: ShopProps) => {
  console.log("base url", BASE_URL);
  return (
    
    <div style={{ marginTop: 150, marginBottom: 20 }}>
      <ProductList />
    </div>
  );
};

export default Shop;
