import { Product } from '../../utils/types'

type Props = {
    product: Product
}

const ProductCard = ({product}: Props) => {
    return (
        <div>
            <div className="card">
                <div className="card-header">
                    Product
                </div>
                <div className="card-body">
                    <h5 className="card-title">{ product.productName }</h5>
                    <p className="card-text">
                        <li className="list-group-item">Description: { product.description }</li>
                        <li className="list-group-item">In stock: { product.quantityInStock }</li>
                        <li className="list-group-item">Price: { product.price }</li>
                    </p>
                    <a className="btn btn-primary">Order</a>
                </div>
            </div>
        </div>
    )
 
}

export default ProductCard