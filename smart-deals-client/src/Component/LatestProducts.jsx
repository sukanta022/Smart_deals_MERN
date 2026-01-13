import React, { use } from 'react';
import Product from './Product';



const LatestProducts = ({latestProductsPromise}) => {
    const latestProducts = use(latestProductsPromise)
    console.log(latestProducts)
    return (
        <div className='w-10/12 mx-auto'>
            <h1 className='text-3xl font-bold text-center gradient-text'>Latest Product</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    latestProducts.map(product => <Product product={product}></Product>)
                }
            </div>
        </div>
    );
};

export default LatestProducts;