import React, { useState } from 'react';
import {Redirect} from 'react-router-dom';

import ImageHelper from "./helper/ImageHelper";
import { addItemToCart, removeItemFromCart } from './helper/CartHelper';
import { isAuthenticated } from '../auth/helper';



const Card = ({
    product,
    addtoCart = true,
    removeFromCart = false,
    reload=undefined,
    setReload=f => f,
    }) => {

        const [redirect, setRedirect] = useState(false)

        const cartTitle = product ? product.name : "coding Ninja"
        const cartDescription = product ? product.description : "coding Ninja description"
        const cartPrice = product ? product.price : "Default price"

        const addToCart = () => {
            if(isAuthenticated()){
                addItemToCart(product, () => setRedirect(true))
                console.log('added to cart');
                
            }else{
                console.log('login please');
                
            }
        }

        const getARedirect = redirect => {
            if(redirect){
                return <Redirect to="/cart" />
            }
        }

        const showAddToCart = addtoCart => {
            return(
                addtoCart && (
                    <button
                        onClick={addToCart}
                        className="btn btn-block btn-outline-success mt-2 mb-2"
                        >
                        Add to Cart
                    </button>
                )
            )
        }

        const showRemoveFromCart = removeFromCart => {
            return(
            removeFromCart && (
                <button
                    onClick={() => {
                        removeItemFromCart(product._id)
                        setReload(!reload)
                        console.log('product removed from cart')
                    }}
                    className="btn btn-block btn-outline-danger mt-2 mb-2"
                    >
                    Remove from cart
                </button>
            ))
        }


    return (
      <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead">{cartTitle}</div>
        <div className="card-body">
        {getARedirect(redirect)}
          <ImageHelper product={product} />
          <p className="lead bg-success font-weight-normal text-wrap">
            {cartDescription}
          </p>
          <p className="btn btn-success rounded  btn-sm px-4">$ {cartPrice}</p>
          <div className="row">
            <div className="col-12">
                {showAddToCart(addtoCart)}
            </div>
            <div className="col-12">
                {showRemoveFromCart(removeFromCart)}
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Card;