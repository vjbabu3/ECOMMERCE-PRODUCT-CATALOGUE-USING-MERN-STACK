
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();

    const keyword = searchParams.get('keyword') || '';
    const category = searchParams.get('category') || '';

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`/api/products?keyword=${keyword}&category=${category}`);
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products", error);
                setError('Failed to fetch products. Is the backend running?');
                setLoading(false);
            }
        };
        fetchProducts();
    }, [keyword, category]);

    if (loading) return <div className="text-center py-20 text-xl font-bold text-gray-600 animate-pulse">Loading amazing products...</div>;
    if (error) return (
        <div className="text-center py-20">
            <div className="text-xl text-red-500 mb-4">{error}</div>
            <button
                onClick={() => window.location.reload()}
                className="bg-accent text-primary px-6 py-2 rounded-full font-bold hover:bg-yellow-500 transition"
            >
                Try Again
            </button>
        </div>
    );

    return (
        <div>
            <Hero />
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {keyword ? `Search Results for "${keyword}"` : category ? `${category} Products` : 'Latest Products'}
                    </h2>
                    {(keyword || category) && (
                        <button
                            onClick={() => window.location.href = '/'}
                            className="text-accent hover:underline font-bold"
                        >
                            Clear Filters
                        </button>
                    )}
                </div>
                {products.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-2xl text-gray-400 mb-4 font-bold">No products found matching your criteria.</div>
                        <p className="text-gray-500">Try searching for something else or browse another category.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
