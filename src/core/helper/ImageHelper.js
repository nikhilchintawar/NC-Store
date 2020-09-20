import React from 'react';

const ImageHelper = ({product}) => {
    const imageUrl = product ? product.image : `https://images.unsplash.com/photo-1592500624072-2d3229dfed53?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60`

    return (
        <div className="rounded border border-success p-2">
            <img 
                src={imageUrl} 
                alt="coding T-Shirt" 
                style={{maxHeight:"100%", maxWidth:"100%"}}
                className="mb-3 rounded"    
            />
        </div>
    );
};

export default ImageHelper;