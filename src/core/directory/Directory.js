import React, { useState, useEffect } from 'react';

import './directory.styles.scss';
import { getAllCategories } from '../helper/CategoryHelper';
import MenuItem from '../../components/menu-item/MenuItem';


const Directory = () => {

    const [categories, setCategories] = useState([]);

    const getCategory = () => {
        getAllCategories()
        .then(data => {
            if(data){
                setCategories(data)
            }else{
                setCategories([])
            }
        })
        .catch(error => console.log(error))
    }

    useEffect(() => {
        getCategory()
    }, [])

    return (
        <div className="directory-menu">
            {
                categories.map(({...categoryProps}, index) => (
                    <MenuItem key={index} {...categoryProps} />
                ))
            }
        </div>
    );
};

export default Directory;