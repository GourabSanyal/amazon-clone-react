import React from 'react'
import CheckoutProduct from './Checkout';
import './Payment.css'
import { useStateValue } from './StateProvider'
import {Link} from "react-router-dom"

function Payment() {
    const[{basket, user}, dispatch] = useStateValue();

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
                         {/* Stripe magiv weill go here */}
                     </div>

                 </div>
            </div>
        </div>
    )
}

export default Payment
