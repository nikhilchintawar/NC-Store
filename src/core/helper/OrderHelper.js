import { API } from "../../backend";


const createOrder = (userId, token, orderData) => {
    const formData = new FormData();

    for(const name in orderData){
        formData.append(name, orderData[name])
    }

    return fetch(`${API}order/add/${userId}/${token}/`, {
        method:"POST",
        body: formData
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

export {createOrder}