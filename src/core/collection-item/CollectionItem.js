import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';


import './collection-item.styles.scss';
import { isAuthenticated } from '../../auth/helper';
import { addItemToCart } from '../helper/CartHelper';
import CustomButton from '../../components/custom-button/CustomButton';
import Modal from '../../modal/Modal';
import SignInModal from '../../user/signin-modal/SignInModal';


const CollectionItem = ({product, match}) => {

    const [category, setCategory] = useState('');
    const [isSignedIn, setIsSignedIn] = useState(isAuthenticated() ? true : false)

    const productName = product ? product.name : "coding Ninja"
    const productDescription = product ? product.description : "coding Ninja description"
    const productPrice = product ? product.price : "Default price"
    const imageUrl = product ? product.image : `https://images.unsplash.com/photo-1592500624072-2d3229dfed53?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60`

    // console.log(product.category)

    const toggleIsSignedIn = () => setIsSignedIn(!isSignedIn)


    useEffect(() => {
        const getCategory = async () => {
            return fetch(`${product.category}`, {
                method: "GET"
            })
            .then(response => response.json())
            .then(data => setCategory(data))
            .catch(error => console.log(error))
        }

        getCategory()
    }, [product])

    const addToCart = () => {
        if(isAuthenticated()){
            addItemToCart(product)    
        }else{
           console.log('please sign in.')
        }
    }


    return (
        <div className='collection-item'>
            {/* <Link to={`${match.path}/${category.name}`} className="category">{category.name}</Link> */}
            {
                !isSignedIn && <Modal><div className="signin-modal"><SignInModal toggleIsSignedIn={toggleIsSignedIn} /></div></Modal>
            }
            <div className="category">{category.name}</div>
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
            <CustomButton onClick={() => isSignedIn ? addToCart() : toggleIsSignedIn()} inverted>
                Add to cart
            </CustomButton>
    </div>
    );
};

export default withRouter(CollectionItem);