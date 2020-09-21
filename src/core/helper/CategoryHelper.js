import {API} from '../../backend';


const getAllCategories = () => {
    return fetch(`${API}category/`, {
        method: 'GET'
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}


export {getAllCategories}