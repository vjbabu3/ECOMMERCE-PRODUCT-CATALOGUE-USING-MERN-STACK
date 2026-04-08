import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-12 md:py-20">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-8 md:mb-0">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                        Discover the <br /> <span className="text-accent">Best Deals</span> Online
                    </h1>
                    <p className="text-lg text-gray-300 mb-8">
                        Shop the latest electronics, fashion, and home essentials with fast delivery and premium support.
                    </p>
                    <Link
                        to="/"
                        className="bg-accent text-primary px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-500 transition shadow-lg transform hover:scale-105 inline-block text-center"
                    >
                        Shop Now
                    </Link>
                </div>
                <div className="md:w-1/2 flex justify-center">
                    <img
                        src="/hero-image.png"
                        className="w-full h-auto max-h-[500px] object-cover rounded-xl shadow-2xl transform hover:scale-105 transition duration-500"
                        alt="Best Deals Online"
                    />
                </div>
            </div>
        </div>
    );
};

export default Hero;
