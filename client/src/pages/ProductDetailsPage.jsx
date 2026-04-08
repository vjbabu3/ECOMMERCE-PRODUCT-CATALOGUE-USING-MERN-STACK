import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
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

const ProductDetailsPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(1);
    const navigate = useNavigate();
    const { addToCart, cartItems } = useCart();

    const isInCart = cartItems.find((x) => x._id === (product && product._id));

    const addToCartHandler = () => {
        if (isInCart) {
            navigate('/cart');
        } else {
            addToCart(product, qty);
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/api/products/${id}`);
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product", error);
            }
        };
        fetchProduct();
    }, [id]);

    if (!product) return <div className="text-center py-20">Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <Link to="/" className="flex items-center text-gray-600 hover:text-accent mb-6 transition">
                <FaArrowLeft className="mr-2" /> Back to Products
            </Link>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2">
                    <img src={product.image} alt={product.name} className="w-full rounded-lg shadow-lg" loading="lazy" />
                </div>
                <div className="md:w-1/2">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
                    <div className="border-b border-gray-200 pb-4 mb-4">
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                    </div>
                    <p className="text-4xl font-bold text-gray-900 mb-6">₹{product.price.toLocaleString('en-IN')}</p>
                    <p className="text-gray-700 leading-relaxed mb-8">{product.description}</p>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="font-bold text-gray-700">Status:</div>
                        <div className={product.countInStock > 0 ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                            {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                        </div>
                    </div>

                    {product.countInStock > 0 && (
                        <div className="flex items-center gap-4 mb-6">
                            <div className="font-bold text-gray-700">Quantity:</div>
                            <select
                                value={qty}
                                onChange={(e) => setQty(Number(e.target.value))}
                                className="border border-gray-300 rounded px-2 py-1 focus:outline-accent"
                            >
                                {[...Array(product.countInStock).keys()].map((x) => (
                                    <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <button
                        onClick={addToCartHandler}
                        className={`w-full md:w-auto px-8 py-3 rounded-md font-bold text-lg transition ${product.countInStock > 0
                            ? (isInCart ? "bg-gray-800 text-white" : "bg-accent text-white hover:opacity-90")
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                        disabled={product.countInStock === 0}
                    >
                        {product.countInStock > 0 ? (isInCart ? 'Go to Cart' : 'Add to Cart') : 'Out of Stock'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
