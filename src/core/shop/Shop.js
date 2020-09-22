import React, { useState, useEffect } from 'react';

import './shop.styles.scss';
import {getProducts} from '../helper/CoreApiCalls';
import Card from '../card/Card';

const Shop = () => {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    const loadAllProducts = () => {
        getProducts()
            .then(data => {
                console.log(data)
                if(data.error){
                    console.log(error)
                    setError(data.error)
                }else{
                    setProducts(data);
                }
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        loadAllProducts()
    }, [])

    return (
        <div>
            <h1>SHOP PAGE</h1>
            <div className='shop-collection'>
                {
                    products.map((product, index) => {
                        return(
                                <Card
                                key={index} 
                                product={product}
                                addtoCart={true}
                                removeFromCart={false}
                                />
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Shop;