import React from 'react';
import { toast } from 'react-toastify';

import "./utils.scss"

const ShowToastMessage = ({value, customIdValue, toastMessage, color}) => {
    const customId = customIdValue;
    return(   
            <div>
                {
                 value && toast(`${toastMessage}`, {
                            position:"top-right",
                            className: "toastMessage",
                            style: {color: `${color}`},
                            toatId:customId,
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined,
                        })
                }
            </div>
    )
}

export {ShowToastMessage};