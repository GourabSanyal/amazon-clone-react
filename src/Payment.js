import React from 'react'
import CheckoutProduct from './Checkout';
import './Payment.css'
import { useStateValue } from './StateProvider'
import {Link, useHistory} from "react-router-dom"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { useState, useEffect } from 'react';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios';
import { PassThrough } from 'stream';

function Payment() {
    const[{basket, user}, dispatch] = useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded]=useState(false);
    const [processing, setProcessing]= useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled]= useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        // generates a stripe sectret key which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                //Stripe expects the totals in currencies in sub-unites, that's why multiply it with 100
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    }, [basket])

        console.log("Secret >>>", clientSecret)

    const handleSubmit = async (event) => {
        //do fancy stripe stuff
        event.preventDefault()
        setProcessing(true)

        // const payload = await stripe

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            //paymetnIntent = payment Confirmation

            setSucceeded(true);
            setError(null)
            setProcessing(false)

            history.replace('/orders')
        })

    }
    
    const handleChange = (event) => {
        //Listenes for any changes in the card element
        //display errors as the customer type their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.messege : "")
    }

    return (
        <div className='payment'>
            <div className="payment_container">
                <h1>
                    Checkout (
                        <Link to="/checkout">{basket?.length}</Link>
                    )
                </h1>


                 {/* Delivery Address */}
                 <div className="payment_section">
                     <div className="payment_title">
                        <h3>Delivery Address</h3>
                     </div>
                     <div className="payment_address">
                         <p>{user?.email}</p>
                         <p>123 React Lane</p>
                         <p>Bangalore, Karnataka</p>
                     </div>
                 </div>

                 {/* review Items */}
                 <div className="payment_section">
                     <div className="payment_title">
                    <h3>Review Items and delivery</h3> 
                    </div>
                    <div className="payment_items">
                        {basket.map(item => (
                        <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                            />
                        ))}
                    </div>
                 </div>

                 {/* Payment Method */}
                 <div className="payment_section">
                     <div className="payment_title ">
                         <h3>Payment Method</h3>
                     </div>

                     <div className="payment_details">
                         {/* Stripe magic weill go here */}

                         <form onSubmit={handleSubmit}>
                             <CardElement onChange={handleChange}/>

                            <div className="payment_priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>
                                            Order Total: {value}
                                        </h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>
                            {/* Error handeling */}
                            {error && <div>{error}</div>}
                         </form>
                     </div>

                 </div>
            </div>
        </div>
    )
}

export default Payment
