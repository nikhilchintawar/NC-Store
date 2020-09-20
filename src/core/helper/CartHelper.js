const addItemToCart = (item, next) => {
    let cart = []
    if(typeof window !== undefined){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        cart.push({
            ...item
        })
        localStorage.setItem("cart", JSON.stringify(cart));
        next();
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
        cart.map((product, index) => {
            if(product._id === productId){
                cart.splice(index, 1)
            }
        })
        localStorage.setItem("cart", JSON.stringify(cart))
    }
    return cart;
}

const cartEmpty = next => {
    if(typeof window !== undefined){
        localStorage.removeItem("cart")
        let cart = []
        localStorage.setItem("cart", JSON.stringify(cart))
        next()
    }
}

export {addItemToCart, loadCart, removeItemFromCart, cartEmpty}