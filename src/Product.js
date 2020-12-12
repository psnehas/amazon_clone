import React from 'react'
import './Product.css'
import {useStateValue} from './StateProvider'
function Product({id, title, image, price, rating}) {
    const [basket,dispatch] = useStateValue();
    // console.log("this is the basket:", basket)

    const addToBasket = () =>{
        // dispatch an item to the dataLayer
        dispatch({
            type:"ADD_TO_BASKET",
            item:{
                id:id,
                title: title,
                image: image,
                price: price,
                rating:rating
            }
        })
    }




    return (
        <div className='product'>
            <div className='product__info'>
                <p><strong>{title}</strong></p>
                <p className='product__price'>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className='product__rating'>
                    <p> {"⭐".repeat(rating)}</p>
                    
                </div>
            </div>

            <img src={image} alt="product"></img>
            {/* "https://images-na.ssl-images-amazon.com/images/I/51CgKGfMelL._AC_UL320_SR320,320_.jpg */}
            <button onClick={addToBasket}>Add to Basket</button>
        </div>
    )
}

export default Product
