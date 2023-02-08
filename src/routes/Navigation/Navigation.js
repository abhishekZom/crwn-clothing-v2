import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import { CartContext } from '../../contexts/cart.context';
import { UserContext } from '../../contexts/user.context';

import CartDropdown from '../../components/CartDropdown';
import CartIcon from './../../components/CartIcon';

import { signOutUser } from './../../utils/firebase/firebase.utils';
import './navigation.styles.scss';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <CrwnLogo className="logo"/>
        </Link>
        <div className='nav-links-container'>
          <Link className="nav-link" to='/shop'>
            SHOP
          </Link>
          { !!currentUser ? (
            <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        { !!isCartOpen && <CartDropdown></CartDropdown> }
        
      </div>
      <Outlet />
    </>
  )
}

export default Navigation;