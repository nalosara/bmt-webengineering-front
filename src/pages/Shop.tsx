import ProductList from "../components/ProductList";

type ShopProps = {};

const Shop = (props: ShopProps) => {
  return (
    <div className="container-fluid vw-100" style={{ marginTop: 150, marginBottom: 20 }}>
      <ProductList />
    </div>
  );
};

export default Shop;
