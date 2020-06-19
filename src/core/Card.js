import React, {useState} from 'react';
import moment from 'moment';
import {Link, Redirect} from 'react-router-dom';
import ShowImage from './ShowImage';
import {addItem} from './cartHelpers';

const Card = ({
        product,
        showViewProduct = true,
        showAddToCart = true}) => {
    const [redirect, setRedirect] = useState(false);

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(false);
        });
    }

    const shouldRedirect = (redirect) => {
        if (redirect) {
            return(
                <Redirect to='/cart'/>
            );
        }
    }

    const showViewButton = (showViewProduct) => {
        return(
            showViewProduct &&(
                <Link
                    to={`/product/${product._id}`}
                    className='mr-2'>
                    <button
                        className='btn btn-outline-primary mt-2 mb-2'>
                            View product
                    </button>
                </Link>
            )              
        );
    }    

    const showAddToCartButton = (showAddToCartButton) => {
        return(
            showAddToCart &&(
                <button
                    onClick={() => {
                        addToCart()
                    }}            
                    className='btn btn-outline-warning mt-2 mb-2'>
                    Add to cart
                </button>                  
            )
        );
    }

    const showStock = (quantity) => {
        let message =
            (quantity > 0) ? `In stock: ${quantity}` : 'Out of stock'

        return quantity > 0 && (
            <span className='badge badge-primary badge-pill'>
                {message}
            </span>
        );
    }

    return(
        <div className='card'>
            <div
                className='card-header name'>
                {product.name}
            </div>
            <div
                className='card-body'>
                {shouldRedirect(redirect)}
                <ShowImage
                    item={product}
                    url="product"/>
                <p className='lead mt-2'>{product.description.substring(0, 100)}</p>
                <p className='black-10'>
                    $ {product.price}</p>
                <p className='black-9'>
                    Category: {product.category && product.category.name}
                </p>
                <p className='black-8'>
                    Added on {moment(product.createdAt).fromNow()}
                </p>
                {showStock(product.quantity)}
                <br/>             
                {showViewButton(showViewProduct)}               
                {showAddToCartButton(showAddToCart)}            
            </div>
        </div>

    );
}

export default Card;