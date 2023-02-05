import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import Button from '../Button';
import CartItem from '../CartItem/CartItem';
import './cartDropdown.styles.scss';

const CartDropdown = ({}) => {
  const { cartItems } = useContext(CartContext);
  return (
    <div className="cart-dropdown-container">
      <div className='cart-items'>
        {
          !!cartItems && cartItems.length > 0 && cartItems.map((item) => {
            debugger;
            return <CartItem key={item.id} cartItem={item} />
          })
        }
      </div>
      <Button>Go To Checkout</Button>
    </div>
  )
}

export default CartDropdown;