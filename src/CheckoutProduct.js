import React from 'react'
import './CheckoutProduct.css'
import { useStateValue } from './StateProvider';

const CheckoutProduct = ({id, image, title, price, rating}) => {
    const [{basket}, dispatch] = useStateValue();

    const removeFromBasket = () => {
        // remove the item from the basket
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id: id,

        })
    }
    return (
        <div className='checkoutProduct'>
            <img className='checkoutProduct_image' src={image} alt="" />            

            <div className="checkoutProduct_info">
                <p className='checkoutProduct_info'>{title}</p>
                <p className="checkoutProduct_price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutProduct_rating">
                    {Array(rating)
                    .fill()
                    .map((_, i) => {
                        <p>*</p>
                    })}
                </div>
                <button onClick={removeFromBasket}>Remove from basket</button>
            </div>

        </div>
        
    )
}

export default CheckoutProduct
