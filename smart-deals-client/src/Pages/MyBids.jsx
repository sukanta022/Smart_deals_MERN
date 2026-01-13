import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Swal from 'sweetalert2';

const MyBids = () => {
    const {user} = use(AuthContext)
    const [bids, setBids] = useState([])
    useEffect(() => {
        if(user?.email){
            fetch(`http://localhost:3000/bids?email=${user.email}`)
            .then(res => res.json())
            .then((data) => {
                console.log("ALL bids are", data)
                setBids(data)
            })
        }
    }, [user?.email])

    const handleBidDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
            }).then((result) => {
            if (result.isConfirmed) {

                fetch(`http://localhost:3000/bids/${_id}`, {
                    method : 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if(data.deletedCount)
                    {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        const newRemaingbid = bids.filter((bid) => bid._id !== _id)
                        setBids(newRemaingbid)
                    }
                })
                
            }
        });
    }


    return (
        <div>
            <p>Total your bids: {bids.length}</p>
            <div className="overflow-x-auto">
                <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>SL NO</th>
                    <th>Product</th>
                    <th>Seller</th>
                    <th>Bid price</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {/* row 1 */}
                    {
                        bids.map((bid, index) => <tr>
                    <th>{index+1} </th>
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
                            <div className="font-bold">Hart Hagerty</div>
                            
                        </div>
                    </div>
                    </td>
                    <td>
                        {}
                    
                    </td>
                    <td>{bid.bid_price}</td>
                    <td>
                        <div className='badge badge-warning text-white'>{bid.status}</div>
                    </td>
                    <th>
                        <button
                         onClick={() => handleBidDelete(bid._id)}
                         className="btn btn-outline btn-error">
                            Remove Bid
                        </button>
                    </th>
                </tr>)
                    }
                {/* row 2 */}
                
                
                </tbody>
                
                </table>
            </div>
        </div>
    );
};

export default MyBids;