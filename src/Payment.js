import React,{useState, useEffect} from 'react';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css';
import {useStateValue} from './StateProvider';
import {Link, useHistory} from 'react-router-dom';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios';
import {db} from './firebase';

function Payment() {

    const [{basket,user}] = useStateValue();

    const stripe = useStripe();
    const elements = useElements();

    const history = useHistory();

    // when we write into the card element, we listen for changes in the card element and display any errors the customer types in.
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(()=>{
        // generate the special stripe secret which alows to charage a customer. UseEffect needs to listen to changes in the basket as the total price will change per the items changing in the basket.
        const getClientSecret = async () =>{
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits => meaning, if you are sending a dollar, you have to send 100 cents instead.
                url: `payments/create?total=${getBasketTotal(basket)*100}`
            });
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    },[basket])

    const handleSubmit = async (event)=>{
        event.preventDefault();
        // block the button when submit is clicked once
        setProcessing(true);

        // get a client secret - whenever we have a payment to process we inform stripe about the payment and ask for a secret key to perform that transaction. 
        const payload = await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:elements.getElement(CardElement)
            }
        }).then(({paymentIntent})=>{
            // payment intent is a parameter in response sent by stripe.
            // payment intent = payment confirmation

            db.collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                basket:basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            }) //when the payment comes successful from stripe, we collect the details and then push the orders into database.



            setSucceeded(true);
            setError(null);
            setProcessing(false);
            // replace so that the user is not redirected back to the payment page. history.push would again bring back the payment page.
            dispatchEvent({
                type: 'EMPTY_BASKET'
            })
            history.replace('/orders')
        })

    }

    const handleChange = (event)=>{
        // Listen for changes in CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className="payment">
            <div className = "payment__container">
                <h1>
                    Checkout {<Link to="/checkout">({basket?.length} items)</Link>}
                </h1>
                {/* payment section - delivery address */}
                 <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                 </div>
                 {/* payment section - review items */}
                 <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>

                    </div>
                    <div className = "payment__items">
                        {basket.map((item)=>(
                            <CheckoutProduct 
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price = {item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                 </div>
                 {/* payment section - payment method */}
                 <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        {/* Stripe integration payment */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange = {handleChange} />
                                <div className="payment__priceContainer">
                                    <CurrencyFormat
                                        renderText = {(value)=>(
                                            <h3>Order Total: {value}</h3>
                                        )}
                                        decimalScale = {2}
                                        value = {getBasketTotal(basket)}
                                        displayType = {"text"}
                                        thousandSeparator = {true}
                                        prefix={"$"}
                                    />
                                    <button disabled={processing || disabled || succeeded}>
                                        <span>{processing ? <p>Processing</p>: "Buy Now"}</span>
                                    </button>
                                </div>
                                {/* if any errors due to card,it will display the error*/}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                 </div>
            </div>
            
        </div>
    )
}

export default Payment
