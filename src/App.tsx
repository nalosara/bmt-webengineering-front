import './App.css'
import ProductCard from './components/ProductCard/ProductCard'
import { Product } from './utils/types'
import ProductList from './components/ProductList'

function App() {

  return (
    <>
    <h2 className='m-2'>Find a product...</h2>
    <ProductList />
    </>
  )    

}

export default App
