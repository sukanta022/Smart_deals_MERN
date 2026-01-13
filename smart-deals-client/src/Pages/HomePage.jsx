import React, { Suspense } from 'react';
import LatestProducts from '../Component/LatestProducts';

const latestProductsPromise = fetch('http://localhost:3000/latest-products').then(res => res.json())

const HomePage = () => {
    return (
        <div>
            <Suspense fallback={"Loading......."}>
                <LatestProducts latestProductsPromise={latestProductsPromise}></LatestProducts>
            </Suspense>
            
        </div>
    );
};

export default HomePage;