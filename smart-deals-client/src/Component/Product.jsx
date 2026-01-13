import React from 'react';
import { Link } from 'react-router';

const Product = ({product}) => {
    const {_id,price_min, price_max, title, image, usage} = product
    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <figure className="px-10 pt-10 h-[280px]">
                <img
                src= {image}
                alt="Shoes"
                className="rounded-xl" />
            </figure>
            <div className="card-body items-center">
                <h2 className="card-title">{title} [{usage}]</h2>
                <p className='font-semibold gradient-text'>$ {price_max}-{price_min}  </p>
                
                <Link to={`/productDetails/${_id}`} className="btn w-full linear-bg gradient-text gradient-border">View Details</Link>
                
            </div>
        </div>
    );
};

export default Product;