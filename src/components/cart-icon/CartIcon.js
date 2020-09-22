import React from 'react';
import { withRouter } from 'react-router-dom';

import './cart-icon.styles.scss';
import {ReactComponent as ShoppingCartIcon} from './../../assets/shopping-bag.svg';

const CartIcon = ({history}) => {

    return (
        <div className="cart-icon" onClick={() => history.push('/cart')}>
            <ShoppingCartIcon className="shopping-icon" />
            <span className="item-count">1</span>
        </div>
    );
};

export default withRouter(CartIcon);