import { useState } from 'react'
import { productList } from '../../constants'
import ProductCard from '../ProductCard/ProductCard'

type Props = {}

const ProductList = (props: Props) => {
    const [products, setProducts] = useState(productList);

  return (
    <div className="row">
           {
               products.map((product, i) => (
                   <ProductCard product={product} key={i} />
               ))
           }
       </div>
  )
}

export default ProductList