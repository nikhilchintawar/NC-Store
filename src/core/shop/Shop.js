import React, { useState, useEffect } from 'react';

import './shop.styles.scss';
import {getProducts} from '../helper/CoreApiCalls';
import CollectionItem from '../collection-item/CollectionItem';

const Shop = () => {

    const [products, setProducts] = useState([]);
    // const [error, setError] = useState(false);


    useEffect(() => {
        const loadAllProducts = () => {
            getProducts()
                .then(data => {
                    if(data.error){
                        // setError(data.error)
                        console.log(data.error)
                    }else{
                        setProducts(data);
                    }
                })
                .catch(error => console.log(error))
        }

        loadAllProducts()
    }, [])

    return (
        <div>

            <h1 style={{textAlign: 'center'}}>SHOP PAGE</h1>
            <div className='shop-collection'>
                {
                    products.map((product, index) => {
                        return(
                            <CollectionItem key={index} product={product} />
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Shop;