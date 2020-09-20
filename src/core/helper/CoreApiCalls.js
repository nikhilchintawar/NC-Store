import {API} from "../../backend";

const getProducts = () => {
    return fetch(`${API}product`, {
        method: 'GET'
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}


export {getProducts}