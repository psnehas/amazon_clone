import React from 'react'
import './CheckoutProduct.css'
import {useStateValue} from './StateProvider'
function CheckoutProduct({id, image, title, price, rating,hideButton}) {
    const [dispatch] = useStateValue();
    const removeFromBasket = () =>{
        // remove item from basket
        dispatch({
            type:"REMOVE_FROM_BASKET",
            id: id
            
        })
    }
    return (
        <div className="checkoutProduct">
            <img className="checkoutProduct__image" src={image} alt=""/>
            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">{title}</p>
                <p className="checkoutProduct__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className='product__rating'>
                    <p> {"⭐".repeat(rating)}</p>
                    
                </div>
                {!hideButton && (
                    <button onClick={removeFromBasket}>Remove from basket</button>
                )}
                
                
            </div>
        </div>
    )
}

export default CheckoutProduct
