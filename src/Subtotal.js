import React from 'react'
import "./Subtotal.css"
import CurrencyFormat from "react-currency-format"
import { HistoryOutlined, SportsBasketball } from '@material-ui/icons'
import {useStateValue} from "./StateProvider"
import { getBasketTotal } from './reducer'
import { useHistory } from 'react-router-dom'

function Subtotal() {
  const history = useHistory(); 
  const [{basket}, dispatch] = useStateValue();

     return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              {/* Part of the homework */}
              Subtotal({basket.length} items)
                <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)} // Part of the homework
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
            <button onClick={(e) => history.push('./payment')}>Proceed to checkout</button>
        </div>
    )
}

export default Subtotal;
