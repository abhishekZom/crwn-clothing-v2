import Button from '../Button';
import './cartDropdown.styles.scss';

const CartDropdown = ({}) => {
  return (
    <div className="cart-dropdown-container">
      <div className='cart-items'>

      </div>
      <Button>Go To Checkout</Button>
    </div>
  )
}

export default CartDropdown;