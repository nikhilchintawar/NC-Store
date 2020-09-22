import React, { useState, useEffect } from 'react';
import Card from './card/Card';
import { loadCart } from './helper/CartHelper';
import PaymentB from './PaymentB';



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
                        <Card 
                            key={index}
                            product={product}
                            addtoCart={false}
                            removeFromCart={true}
                            reload={reload}
                            setReload={setReload}
                        />
                    ))
                }
            </div>
        )
    }


    return (
        
            <div className="row text-center">
                <div className="col-6">
                    {products.length > 0 ? loadAllProducts(products) : <h4>No products</h4>}
                </div>
                <div className="col-6">
                    {products.length > 0 ? <PaymentB products={products} setReload={setReload} /> : <h3>Please login or something in cart.</h3>}
                </div>
            </div>
        
    );
};

export default Cart;