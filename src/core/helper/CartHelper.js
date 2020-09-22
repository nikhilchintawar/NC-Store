const addItemToCart = (item) => {
    let cart = []
    let existingCartItem;
    if(typeof window !== undefined){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        if(cart.length !== 0){
            existingCartItem = cart.find(cartItem => (
                cartItem.id === item.id
            ))
        }

        if(existingCartItem){
            cart = cart.map(cartItem => 
                cartItem.id === item.id
                ?
                {...cartItem, quantity: cartItem.quantity + 1}
                :
                cartItem
                )
        }else{
            cart.push({
                ...item, quantity: 1
            })
        }
        
        localStorage.setItem("cart", JSON.stringify(cart));
        return
    }
}

const loadCart = () => {
    if(typeof window !== undefined){
        if(localStorage.getItem("cart")){
            return JSON.parse(localStorage.getItem("cart"))
        }
    }
}

// TODO: debug the map 
const removeItemFromCart = (productId) => {
    let cart = []

    if(typeof window !== undefined){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        console.log(cart)
        console.log(productId)
        const existingCartItem = cart.find(
            cartItem => cartItem.id === productId
        );
            console.log(existingCartItem)
        if(existingCartItem.quantity === 1){
            cart = cart.filter(cartItem => cartItem.id !== productId)
        }else{
            cart = cart.map(cartItem => (
                cartItem.id === productId
                ? { ...cartItem, quantity: cartItem.quantity - 1}
                : cartItem
            ))
        }
        localStorage.setItem("cart", JSON.stringify(cart))
    }
    return cart;
}

// const removeItemFromCart = (cartItems, cartItemToRemove) => {
//     const existingCartItem = cartItems.find(
//       cartItem => cartItem.id === cartItemToRemove.id
//     );
  
//     if (existingCartItem.quantity === 1) {
//       return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
//     }
  
//     return cartItems.map(cartItem =>
//       cartItem.id === cartItemToRemove.id
//         ? { ...cartItem, quantity: cartItem.quantity - 1 }
//         : cartItem
//     );
//   };

const cartEmpty = next => {
    if(typeof window !== undefined){
        localStorage.removeItem("cart")
        let cart = []
        localStorage.setItem("cart", JSON.stringify(cart))
        next()
    }
}

const filterItemFromCart =(cartItems, item)=> cartItems.filter(
    cartItem => cartItem.id !== item.id
  );
  
const getCartItemsCount = cartItems => cartItems.reduce(
    (accumalatedQuantity, cartItem) =>
      accumalatedQuantity + cartItem.quantity,
    0
  );
  
const getCartTotal = cartItems => cartItems.reduce(
    (accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity * cartItem.price, 
    0
  )

export {addItemToCart, loadCart, removeItemFromCart, cartEmpty, filterItemFromCart, getCartItemsCount, getCartTotal}