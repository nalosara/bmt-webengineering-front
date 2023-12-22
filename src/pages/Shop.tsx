import ProductList from "../components/ProductList"

type Props = {}

const Shop = (props: Props) => {
  return (
    <div className="container-fluid" style={{ marginTop: 100 }}>
    <ProductList />
    </div>
  )
}

export default Shop