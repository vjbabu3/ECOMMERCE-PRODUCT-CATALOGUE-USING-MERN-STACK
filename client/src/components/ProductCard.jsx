import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const Rating = ({ value, text }) => {
    return (
        <div className="flex items-center text-yellow-500 mb-2">
            {[1, 2, 3, 4, 5].map((index) => (
                <span key={index}>
                    {value >= index ? (
                        <FaStar />
                    ) : value >= index - 0.5 ? (
                        <FaStarHalfAlt />
                    ) : (
                        <FaRegStar />
                    )}
                </span>
            ))}
            <span className="text-gray-600 text-sm ml-2">{text && text}</span>
        </div>
    );
};

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { addToCart, cartItems } = useCart();

    const isInCart = cartItems.find((x) => x._id === product._id);

    const addToCartHandler = () => {
        if (isInCart) {
            navigate('/cart');
        } else {
            addToCart(product, 1);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden flex flex-col h-full">
            <Link to={`/product/${product._id}`}>
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-40 w-full object-cover rounded mb-3"
                    loading="lazy"
                />
            </Link>
            <div className="p-4 flex flex-col flex-1">
                <Link to={`/product/${product._id}`}>
                    <h2 className="text-lg font-bold text-gray-800 hover:text-accent mb-2 line-clamp-2">
                        {product.name}
                    </h2>
                </Link>
                <Rating value={product.rating} text={`${product.numReviews} reviews`} />

                <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
                    <button
                        onClick={addToCartHandler}
                        className={`${isInCart ? 'bg-gray-800' : 'bg-accent'} text-white py-1 px-4 rounded-full font-bold text-sm hover:opacity-90 transition`}
                    >
                        {isInCart ? 'Go to Cart' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
