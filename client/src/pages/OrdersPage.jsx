import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import { FaBoxOpen, FaClock, FaCheckCircle, FaChevronRight } from 'react-icons/fa';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { userInfo } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo) {
            navigate('/login?redirect=orders');
            return;
        }

        const fetchOrders = async () => {
            try {
                const { data } = await axios.get('/api/orders/myorders', {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                });
                setOrders(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching orders", error);
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userInfo, navigate]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 mt-4">Your Orders</h1>

            {orders.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100">
                    <div className="bg-gray-50 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FaBoxOpen className="text-gray-400 text-4xl" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">No Orders Found</h2>
                    <p className="text-gray-500 mb-8">You haven't placed any orders yet.</p>
                    <Link
                        to="/"
                        className="inline-block bg-accent text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition shadow-lg"
                    >
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid gap-6">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition"
                        >
                            <div className="bg-gray-50 p-4 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                                <div className="flex gap-6">
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase">Order Placed</p>
                                        <p className="text-sm font-semibold text-gray-700">
                                            {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase">Total</p>
                                        <p className="text-sm font-semibold text-gray-700">₹{order.totalPrice.toLocaleString('en-IN')}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase">Order ID</p>
                                        <p className="text-sm font-semibold text-gray-700">#{order._id.substring(0, 8).toUpperCase()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    {order.isPaid ? (
                                        <span className="flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                                            <FaCheckCircle className="mr-1.5" /> Order Confirmed
                                        </span>
                                    ) : (
                                        <span className="flex items-center bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">
                                            <FaClock className="mr-1.5" /> Processing
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="divide-y divide-gray-100">
                                    {order.orderItems.map((item, index) => (
                                        <div key={index} className="py-4 first:pt-0 last:pb-0 flex items-center gap-4">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-20 h-20 object-cover rounded-lg flex-shrink-0 bg-gray-50"
                                            />
                                            <div className="flex-grow">
                                                <h3 className="font-semibold text-gray-800 line-clamp-1">{item.name}</h3>
                                                <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                                                <p className="text-sm font-bold text-gray-900 mt-1">₹{item.price.toLocaleString('en-IN')}</p>
                                            </div>
                                            <Link
                                                to={`/product/${item.product}`}
                                                className="text-accent hover:underline text-sm font-semibold hidden md:flex items-center"
                                            >
                                                View Product <FaChevronRight className="ml-1 text-[10px]" />
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrdersPage;
