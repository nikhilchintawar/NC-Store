import React from 'react';

import './cart-icon.styles.scss';
import {ReactComponent as ShoppingCartIcon} from './../../assets/shopping-bag.svg';

const CartIcon = () => {
    return (
        <div className="cart-icon">
            <ShoppingCartIcon className="shopping-icon" />
            <span className="item-count">1</span>
        </div>
    );
};

export default CartIcon;