import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const OrderSuccessPage = () => {
    return (
        <div className="container mx-auto px-4 py-20 text-center">
            <div className="max-w-md mx-auto bg-white p-12 rounded-3xl shadow-2xl border border-gray-50">
                <FaCheckCircle className="text-green-500 text-8xl mx-auto mb-8 animate-bounce" />
                <h1 className="text-4xl font-extrabold mb-4 text-gray-800">Payment Successful!</h1>
                <p className="text-gray-600 mb-10 text-lg leading-relaxed">
                    Thank you for your purchase. Your order has been placed successfully and is being processed.
                </p>
                <div className="flex flex-col gap-4">
                    <Link
                        to="/"
                        className="bg-accent text-white px-8 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition shadow-lg transform hover:scale-[1.02]"
                    >
                        Continue Shopping
                    </Link>
                    <Link
                        to="/profile" // Assuming a profile or orders page exists
                        className="text-gray-500 hover:text-accent font-medium transition"
                    >
                        View Order History
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccessPage;
