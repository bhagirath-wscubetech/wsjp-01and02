import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incCart, decCart, removeFromCart } from './Reducers/Cart';
import Login from './Login';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate();
    const { cart } = useSelector(store => store.cart);
    const { user } = useSelector(store => store.user);
    const [pop, setPop] = useState(false);
    const { product, baseUrl } = useSelector(store => store.product);
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const dispatch = useDispatch();
    useEffect(
        () => {
            if (cart.length != 0) {
                localStorage.setItem("cart", JSON.stringify(cart));
                let catProd = [];
                let totlalPrice = 0;
                product.forEach(
                    (prod) => {
                        let qty = 0;
                        cart.forEach(
                            (c) => {
                                if (c.pId == prod._id) {
                                    qty = c.qty;
                                }
                            }
                        )
                        if (qty != 0) {
                            totlalPrice = totlalPrice + (prod.price * qty);
                            catProd.push(
                                {
                                    ...prod,
                                    qty
                                }
                            );
                        }
                    }
                )
                setList(catProd);
                setTotal(totlalPrice);
            }
        },
        [cart]
    )

    function checkOut() {
        if (user == null) {
            setPop(true);
        } else {
            navigate("/checkout");
        }
    }

    console.log("list", list);

    return (
        <>
            <div className='w-full h-screen fixed z-[9999]  justify-center items-center top-0'
                style={
                    {
                        background: "rgba(0,0,0,0.6)",
                        display: pop == true ? 'flex' : 'none'
                    }
                }
            >
                <div className='shadow rounded w-[500px] h-[400px] bg-white'>
                    <Login url={"/checkout"} closeHandler={setPop}/>
                </div>
            </div>
            <div className=" bg-gray-100 pt-20">
                <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
                {
                    cart.length != 0
                        ?
                        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                            <div className="rounded-lg md:w-2/3">
                                {
                                    list.map(
                                        (item, index) => {
                                            return <div key={index} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                                                <img src={baseUrl + item.image} alt="product-image" className="w-full rounded-lg sm:w-40" />
                                                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                                    <div className="mt-5 sm:mt-0">
                                                        <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>
                                                        <p className="mt-1 text-xs text-gray-700">₹ {item.price}</p>
                                                    </div>
                                                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                                        <div className="flex items-center border-gray-100">
                                                            <span onClick={() => dispatch(decCart({ pId: item._id }))} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                                                            <span className='px-3'>{item.qty}</span>
                                                            {/* <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={item.qty} min="1" /> */}

                                                            <span onClick={() => dispatch(incCart({ pId: item._id }))} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
                                                        </div>
                                                        <div className="flex items-center space-x-4">
                                                            <p className="text-sm">₹{item.price * item.qty}</p>


                                                            <svg onClick={() => dispatch(removeFromCart({ pId: item._id }))} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    )
                                }
                            </div>
                            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                                <div className="mb-2 flex justify-between">
                                    <p className="text-gray-700">Subtotal</p>
                                    <p className="text-gray-700">₹ {total}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-gray-700">Shipping</p>
                                    <p className="text-gray-700">$4.99</p>
                                </div>
                                <hr className="my-4" />
                                <div className="flex justify-between">
                                    <p className="text-lg font-bold">Total</p>
                                    <div className="">
                                        <p className="mb-1 text-lg font-bold">$134.98 USD</p>
                                        <p className="text-sm text-gray-700">including VAT</p>
                                    </div>
                                </div>
                                <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600" onClick={checkOut}>Check out</button>
                            </div>
                        </div>
                        : ""
                }

            </div>
        </>
    );
}

export default Cart;
