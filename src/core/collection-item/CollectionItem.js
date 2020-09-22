import React, { useState, useEffect } from 'react';


import './collection-item.styles.scss';
import { isAuthenticated } from '../../auth/helper';
import { addItemToCart } from '../helper/CartHelper';
import CustomButton from '../../components/custom-button/CustomButton';
import { Link } from 'react-router-dom';


const CollectionItem = ({product}) => {

    const [category, setCategory] = useState('');

    const productName = product ? product.name : "coding Ninja"
    const productDescription = product ? product.description : "coding Ninja description"
    const productPrice = product ? product.price : "Default price"
    const imageUrl = product ? product.image : `https://images.unsplash.com/photo-1592500624072-2d3229dfed53?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60`

    console.log(product.category)

    const getCategory = () => {
        return fetch(`${product.category}`, {
            method: "GET"
        })
        .then(response => response.json())
        .then(data => setCategory(data))
        .catch(error => console.log(error))
    }

    useEffect(() => {
        getCategory()
    }, [])

    const addToCart = () => {
        if(isAuthenticated()){
            addItemToCart(product)      
        }else{
            console.log('login please');    
        }
    }

    return (
        <div className='collection-item'>
            <Link to={`/${category.linkUrl}`} className="category">{category.name}</Link>
            <div
                className='image'
                style={{
                backgroundImage: `url(${imageUrl})`
                }}
            />
            <div className="description">{productDescription}</div>
            <div className='collection-footer'>
                <span className='name'>{productName}</span>
                <span className='price'>{productPrice}</span>
            </div>
            <CustomButton onClick={() => addToCart()} inverted>
                Add to cart
            </CustomButton>
    </div>
    );
};

export default CollectionItem;