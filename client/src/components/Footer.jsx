import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white pt-10 pb-6 mt-12">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="font-bold text-lg mb-4">Get to Know Us</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><a href="#" className="hover:underline">About Us</a></li>
                        <li><a href="#" className="hover:underline">Careers</a></li>
                        <li><a href="#" className="hover:underline">Press Releases</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-lg mb-4">Connect with Us</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><a href="#" className="hover:underline">Facebook</a></li>
                        <li><a href="#" className="hover:underline">Twitter</a></li>
                        <li><a href="#" className="hover:underline">Instagram</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-lg mb-4">Make Money with Us</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><a href="#" className="hover:underline">Sell on ShopZone</a></li>
                        <li><a href="#" className="hover:underline">Affiliate Program</a></li>
                        <li><a href="#" className="hover:underline">Advertise Your Products</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-lg mb-4">Let Us Help You</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><a href="#" className="hover:underline">Your Account</a></li>
                        <li><a href="#" className="hover:underline">Returns Centre</a></li>
                        <li><a href="#" className="hover:underline">Help</a></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
                &copy; {new Date().getFullYear()} ShopZone. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
