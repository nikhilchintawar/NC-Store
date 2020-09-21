import React, { useState, useEffect } from 'react';

import {getProducts} from './helper/CoreApiCalls';
import Base from './Base';
import Card from './Card';

const Shop = () => {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    const loadAllProducts = () => {
        getProducts()
            .then(data => {
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
            <h1>Home Component</h1>
            <div className="row">
                {
                    products.map((product, index) => {
                        return(
                            <div key={index} className="col-4 mb-4">
                                <Card product={product} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Shop;