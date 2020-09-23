import React, { useState, useEffect } from 'react';

import './cart.styles.scss';
import { loadCart } from '../helper/CartHelper';
import PaymentB from '../PaymentB';
import CheckoutItem from '../checkout-item/CheckoutItem';



const Cart = () => {

    const [products, setProducts] = useState([])
    const [reload, setReload] = useState(false)

    useEffect(() => {
        setProducts(loadCart());
    }, [reload])

    const loadAllProducts = (products) => {
        return (
            <div>
                {
                    products.map((product, index) => (
                        <CheckoutItem 
                            key={index} 
                            product={product}
                            reload={reload}
                            setReload={setReload} />
                    ))
                }
            </div>
        )
    }


    return (
        
            <div className="row text-center">
                <div className="col-5 carItems">
                    {products.length > 0 ? loadAllProducts(products) : <h4>No products</h4>}
                </div>
                <div className="col-5">
                    {products.length > 0 ? <PaymentB products={products} setReload={setReload} /> : <h3>Please login or something in cart.</h3>}
                    <div className='test-warning'>
                        *Please use the following test credit card for payments*
                        <br />
                        4111 1111 1111 1111 - Exp: any future date
                    </div>
                </div>
            </div>
        
    );
};

export default Cart;