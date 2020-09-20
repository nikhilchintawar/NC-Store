import {API} from "../../backend";
import {cartEmpty} from "../../core/helper/CartHelper";


const signUp = user => {
    return fetch(`${API}user/`, {
        method:"POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .catch(error => console.log(error))
}

const signIn = user => {
    const formData = new FormData()

    for(const name in user){
        formData.append(name, user[name])
    }

    return fetch(`${API}user/login/`, {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .catch((error) => console.log(error))
}

const authenticate = (data, next) => {
    if(typeof window !== undefined){
        localStorage.setItem("jwt", JSON.stringify(data))
        next();
    }
}

const isAuthenticated = () => {
    if(typeof window == undefined){
        return false;
    }
    if(localStorage.getItem("jwt")){
        // TODO: comapre jwt with jsontoken in db.
        return JSON.parse(localStorage.getItem("jwt"))
    }else{
        return false;
    }
}

const signOut = next => {
    const userId = isAuthenticated() && isAuthenticated().user._id
    if(typeof window !== undefined){
        localStorage.removeItem("jwt")
        cartEmpty(() => {});
        // next();

        fetch(`${API}user/logout/${userId}`, {
            method:"GET"
        })
        .then(response => {
            console.log("Signout success");
            next()
        })
        .catch(error => console.log(error))
    }
}

export {signUp, signIn, authenticate, isAuthenticated, signOut}