import React from 'react'
import './Checkout.css'
import { getBasketTotal } from './reducer';
import Subtotal from './Subtotal'
import CheckoutProduct from './CheckoutProduct'
import {useStateValue } from './StateProvider'
function Checkout() {
    const [{basket,user},dispatch] = useStateValue();
    return (
        <div className="checkout">
            <div className="checkout__left">
                <img className="checkout__ad"
                src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonMusic/2020/Marketing/070620_BackToSchool_ACQ/2G_Design_NonGateway/US-EN_073120_BackToSchool_ACQ_BH_1200x270_CV2.jpg"alt=""/>
                
            
                <div>
                    <h3>Hello, {user?.email}</h3>
                  <h2 className="checkout__title">Your shopping basket</h2> 
                  {basket.map(item=>(
                      <CheckoutProduct
                        id = {item.id}
                        title= {item.title}
                        image = {item.image}
                        price = {item.price}
                        rating = {item.rating}
                      />
                  ))} 
                </div>

                
            </div>
            <div className="checkout__right">
                <Subtotal />   
            </div>
        </div>
    )
}

export default Checkout
