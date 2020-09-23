import { API } from "../../backend";



const updateUser = (user) => {
    const formData = new FormData()

    for(const name in user){
        formData.append(name, user[name])
    }

    return fetch(`${API}user/${user.id}`, {
        method: "PUT",
        body: formData
    })
    .then(response => response.json())
    .catch(error => console.log(error))
}


export {updateUser}