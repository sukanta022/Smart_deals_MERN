import React, { use, useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import Swal from 'sweetalert2';

const ProductDetails = () => {
    const {user} = use(AuthContext)
    const data = useLoaderData()
    const { _id: productID} = data
    console.log(data)
    const bidModalRef = useRef(null)

    const [bids, setBids] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3000/products/bids/${productID}`)
        .then((res) => res.json())
        .then((data) => {
            setBids(data)
            console.log("Product bids are", data)
        } )
    }, [productID])

    const handleBidModal = () => {
        bidModalRef.current.showModal()
    }

    const handleBidSubmit = (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value
        const price = e.target.price.value
        console.log(name, email, price)
        
        const newBid = {
            product : productID,
            buyer_name : name,
            bid_price : price,
            buyer_email : email,
            status : "pending"
        }

        fetch('http://localhost:3000/bids', {
            method: "POST",
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(newBid)
        })
        .then(res => res.json())
        .then((data) => {
            if(data.insertedId){
                bidModalRef.current.close();
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Your bid has been placed",
                    showConfirmButton: false,
                    timer: 1500
                });

                newBid._id = data.insertedId
                const newBidsArr = [...bids,newBid]
                newBidsArr.sort((a,b) => b.bid_price - a.bid_price)
                setBids(newBidsArr)
                console.log("After bid ", data)
            }
            
        })
    }
    return (
        <div>
            {/* for product detaisl */}
            <div>
                <p>{data.title}</p>
                <button onClick={handleBidModal} className='btn linear-bg text-white font-semibold'>I want buy this product</button>
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                
                <dialog ref={bidModalRef} className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box max-w-md rounded-2xl">

                        <h3 className="font-bold text-xl text-center text-[#001931]">Place Your Bid</h3>
                        <p className="text-sm text-center text-gray-500 mt-1">Submit your offered price to the seller</p>

                        <form className="mt-6 space-y-4" onSubmit={handleBidSubmit}>

                            <div>
                                <label className="label"><span className="label-text font-medium">Name</span></label>
                                <input type="text" name="name" defaultValue={user?.displayName} readOnly className="input input-bordered w-full bg-gray-100 cursor-not-allowed" />
                            </div>

                            <div>
                                <label className="label"><span className="label-text font-medium">Email</span></label>
                                <input type="email" name="email" defaultValue={user?.email} readOnly className="input input-bordered w-full bg-gray-100 cursor-not-allowed"/>
                            </div>

                            <div>
                                <label className="label"><span className="label-text font-medium">Your Offer Price</span></label>
                                <input type="number" name="price" placeholder="Enter your price" className="input input-bordered w-full" required/>
                            </div>

                            {/* Actions */}
                            <div className="modal-action flex justify-end gap-3 mt-6">
                                <form method="dialog">
                                    <button className="btn btn-outline w-full">Cancel</button>
                                </form>

                                <button type="submit" className="btn linear-bg text-white hover:linear-bg/90 ">Submit Bid</button>
                            </div>
                        </form>
                    </div>
                </dialog>
            </div>
            {/* for product bid */}
            <div>
                <p>Total bids are {bids.length}</p>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                        <tr>
                            <th>SL No</th>
                            <th>Buyer Name</th>
                            <th>Buyer email</th>
                            <th>Bid Price</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* row 1 */}
                            {
                                bids.map((bid, index) => <tr key={bid._id}>
                            <th>{index + 1}</th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                    <div className="mask mask-squircle h-12 w-12">
                                        <img
                                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                        alt="Avatar Tailwind CSS Component" />
                                    </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{bid.buyer_name}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {bid.buyer_email}
                            </td>
                            <td>{bid.bid_price}</td>
                            <th>
                                <button className="btn btn-ghost btn-xs">details</button>
                            </th>
                        </tr>)
                            }
                        {/* row 2 */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;