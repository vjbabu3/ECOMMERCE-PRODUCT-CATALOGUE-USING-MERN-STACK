import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaTrash } from 'react-icons/fa';

const CartPage = () => {
    const navigate = useNavigate();
    const { cartItems, removeFromCart, updateQuantity } = useCart();

    const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <div className="bg-white p-12 rounded-lg shadow-md text-center">
                    <h2 className="text-2xl mb-6 text-gray-600">Your cart is empty</h2>
                    <Link
                        to="/"
                        className="bg-accent text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition inline-block"
                    >
                        Go Back & Shop
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            {cartItems.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex flex-col md:flex-row items-center gap-6 p-6 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition"
                                >
                                    <div className="w-24 h-24 flex-shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover rounded shadow-sm"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <Link
                                            to={`/product/${item._id}`}
                                            className="text-lg font-bold text-gray-800 hover:text-accent transition block mb-1"
                                        >
                                            {item.name}
                                        </Link>
                                        <div className="text-gray-500 text-sm mb-2">{item.brand}</div>
                                        <div className="text-xl font-bold text-gray-900">₹{item.price.toLocaleString('en-IN')}</div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <select
                                            value={item.qty}
                                            onChange={(e) => updateQuantity(item._id, e.target.value)}
                                            className="border border-gray-300 rounded px-2 py-1 focus:outline-accent bg-white"
                                        >
                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </select>
                                        <button
                                            onClick={() => removeFromCart(item._id)}
                                            className="text-red-500 hover:text-red-700 transition p-2"
                                            title="Remove Item"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
                            <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-4">Order Summary</h2>
                            <div className="flex justify-between mb-4">
                                <span className="text-gray-600">
                                    Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)
                                </span>
                                <span className="font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between mb-6 text-lg">
                                <span className="text-gray-800 font-bold">Total</span>
                                <span className="text-accent font-bold text-2xl">₹{subtotal.toLocaleString('en-IN')}</span>
                            </div>
                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full bg-accent text-white py-4 rounded-lg font-bold text-lg hover:opacity-90 transition shadow-lg transform hover:scale-[1.02]"
                            >
                                Proceed to Checkout
                            </button>
                            <Link
                                to="/"
                                className="block text-center mt-4 text-gray-500 hover:text-accent transition text-sm"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
