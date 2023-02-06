import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/cart.context';
import Button from '../Button';
import CartItem from '../CartItem/CartItem';
import './cartDropdown.styles.scss';

const CartDropdown = ({}) => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckouthandler = () => {
    navigate('/checkout');
  }

  return (
    <div className="cart-dropdown-container">
      <div className='cart-items'>
        {
          !!cartItems && cartItems.length > 0 && cartItems.map((item) => {
            return <CartItem key={item.id} cartItem={item} />
          })
        }
      </div>
      <Button onClick={goToCheckouthandler}>Go To Checkout</Button>
    </div>
  )
}

export default CartDropdown;