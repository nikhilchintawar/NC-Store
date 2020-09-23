import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';

import { cartEmpty, getCartTotal } from './helper/CartHelper';
import {getToken, processPayment} from "./helper/PaymentHelper";
import {createOrder} from "./helper/OrderHelper";
import {isAuthenticated, signOut} from "../auth/helper/index";



const PaymentB = ({
    products,
    reload=undefined,
    setReload=f => f,

}) => {
    
    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {}
    })

    const userId = isAuthenticated && isAuthenticated().user.id;
    const token = isAuthenticated && isAuthenticated().token;

    const getTokenFromHelper = (userId, token) => {
        getToken(userId, token)
            .then(info => {
                console.log(info)
                if(info.error){
                    setInfo({
                        ...info,
                        error: info.error
                    })
                    signOut(() => {
                        return <Redirect to="/" />
                    })
                }else{
                    const clientToken = info.clientToken;
                    setInfo({clientToken});
                }
            })
    }

    useEffect(() => {
        getTokenFromHelper(userId, token)
    },[])


    const onPurchase = () => {
        setInfo({loading: true})
        let nonce;
        let getNonce = info.instance.requestPaymentMethod()
                            .then(data => {
                                console.log("1",data)
                                nonce = data.nonce;
                                const paymentData = {
                                    paymentMethodNonce: nonce,
                                    amount: getCartTotal()
                                }
                                processPayment(userId, token, paymentData)
                                    .then(response => {
                                        if(response.error){
                                            if(response.code === '1'){
                                                console.log("Payment Failed.")
                                                signOut(() => {
                                                    return <Redirect to="/" />
                                                })
                                            }
                                        }else{
                                            setInfo({
                                                ...info,
                                                success: response.success,
                                                loading:false
                                            })
                                            console.log("Payment Success.")
                                            let product_names = ""
                                            products.forEach(item => {
                                                product_names += item.name + ", "
                                            })
                                            const orderData = {
                                                products: product_names,
                                                transaction_id: response.transaction_id,
                                                amount: response.transaction.amount
                                            }
                                            createOrder(userId, token, orderData)
                                                .then(response => {
                                                    if(response.error){
                                                        if(response.code === "1"){
                                                            console.log("order failed.")
                                                        }
                                                        signOut(() => {
                                                            return <Redirect to="/" />
                                                        })
                                                    }else{
                                                        if(response.success === true){
                                                            console.log("order placed.")
                                                        }
                                                    }
                                                })
                                                .catch(error => {
                                                    setInfo({
                                                        loading: false,
                                                        success: false
                                                    })
                                                    console.log("order failed", error)
                                                })
                                                cartEmpty(() => {
                                                    console.log("Cart is emptyed out.")
                                                })
                                                setReload(!reload)
                                        }
                                    })
                                    .catch(error => console.log(error))
                            })
                            .catch(error => console.log(error))
    }

    const shownDropInButton = () => {
        return(
            <div>
                {
                    info.clientToken !== null && products.length > 0 
                    ? (<div>

                        <DropIn
                        options={{authorization:info.clientToken}}
                        onInstance={instance => (info.instance = instance)}
                    >
                    </DropIn>
                        <button onClick={onPurchase} className="btn btn-block btn-success">Pay</button>
                    </div>)
                    : (<h3>Please login </h3>)
                }
            </div>
        )
    }

    return (
        <div>
            <h3>Your amount is ${getCartTotal()}</h3>
            {shownDropInButton()}
        </div>
    );
};

export default PaymentB;