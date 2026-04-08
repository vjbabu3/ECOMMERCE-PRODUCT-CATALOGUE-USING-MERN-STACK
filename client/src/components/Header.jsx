import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaSearch, FaUser, FaBox } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import ShopzoneLogo from './ShopzoneLogo';

const Header = () => {
    const navigate = useNavigate();
    const { userInfo, logout } = useUser();
    const [keyword, setKeyword] = useState('');

    const { cartItems } = useCart();

    const logoutHandler = () => {
        logout();
        navigate('/');
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/?keyword=${keyword}`);
        } else {
            navigate('/');
        }
    };

    return (
        <header className="bg-primary text-white sticky top-0 z-50 shadow-md">
            <div className="container mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
                {/* 1. Logo */}
                <Link to="/" className="flex flex-col items-center shrink-0 mr-4 lg:mr-8 group">
                    <ShopzoneLogo className="w-16 sm:w-20 transition-transform group-hover:scale-105" />
                    <span className="text-xl sm:text-2xl font-black tracking-widest text-[#66D3F2] mt-1">SHOPZONE</span>
                </Link>

                {/* 2. Category Nav (Desktop only) */}
                <nav className="hidden lg:flex items-center space-x-6 mr-6 font-bold text-[13px] tracking-widest text-gray-200">
                    <Link to="/" className="hover:text-accent transition uppercase border-b-2 border-transparent hover:border-accent pb-1">All</Link>
                    <Link to="/?category=Mobile" className="hover:text-accent transition uppercase border-b-2 border-transparent hover:border-accent pb-1">Mobile</Link>
                    <Link to="/?category=Electronics" className="hover:text-accent transition uppercase border-b-2 border-transparent hover:border-accent pb-1">Electronics</Link>
                    <Link to="/?category=Computers" className="hover:text-accent transition uppercase border-b-2 border-transparent hover:border-accent pb-1">Computers</Link>
                    <Link to="/?category=Fashion" className="hover:text-accent transition uppercase border-b-2 border-transparent hover:border-accent pb-1">Fashion</Link>
                    <Link to="/?category=Home%20%26%20Kitchen" className="hover:text-accent transition uppercase whitespace-nowrap border-b-2 border-transparent hover:border-accent pb-1">Home</Link>
                    <Link to="/?category=Shoes" className="hover:text-accent transition uppercase whitespace-nowrap border-b-2 border-transparent hover:border-accent pb-1">Shoes</Link>
                    <Link to="/?category=Groceries" className="hover:text-accent transition uppercase whitespace-nowrap border-b-2 border-transparent hover:border-accent pb-1">Groceries</Link>
                </nav>

                {/* 3. Search Bar (Expanding middle) */}
                <form onSubmit={submitHandler} className="hidden md:flex flex-1 max-w-xl relative bg-gray-100/10 rounded-sm overflow-hidden focus-within:bg-white focus-within:text-gray-900 transition-colors group">
                    <div className="pl-4 pr-3 flex items-center justify-center text-gray-400 group-focus-within:text-gray-500">
                        <FaSearch />
                    </div>
                    <input
                        type="text"
                        name="q"
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Search for products, brands and more"
                        className="w-full py-2.5 px-1 bg-transparent text-white group-focus-within:text-gray-900 placeholder-gray-400 group-focus-within:placeholder-gray-500 outline-none text-sm"
                    />
                </form>

                {/* 4. Action Icons (Right Side) */}
                <nav className="flex items-center space-x-4 sm:space-x-8 ml-auto lg:ml-8 shrink-0">
                    {/* Profile */}
                    {userInfo ? (
                        <div className="flex flex-col items-center hover:text-accent transition cursor-pointer group relative">
                            <FaUser className="text-xl sm:text-[22px] mb-1" />
                            <span className="font-bold text-[10px] sm:text-xs">Profile</span>
                            <div className="absolute top-10 right-0 bg-white text-black text-sm rounded-md shadow-xl hidden group-hover:block w-40 py-2 border border-gray-100 z-[60]">
                                <div className="px-4 py-3 border-b border-gray-100 text-xs text-left">
                                    <span className="block text-gray-500 font-bold mb-1">Welcome</span>
                                    <span className="block font-medium truncate">{userInfo.name}</span>
                                </div>
                                <button onClick={logoutHandler} className="block w-full text-left font-bold text-gray-700 px-4 py-2 hover:bg-gray-50 transition">Sign Out</button>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" className="flex flex-col items-center hover:text-accent transition">
                            <FaUser className="text-xl sm:text-[22px] mb-1" />
                            <span className="font-bold text-[10px] sm:text-xs">Profile</span>
                        </Link>
                    )}

                    {/* Orders */}
                    <Link to="/orders" className="flex flex-col items-center hover:text-accent transition">
                        <FaBox className="text-xl sm:text-[22px] mb-1" />
                        <span className="font-bold text-[10px] sm:text-xs">Orders</span>
                    </Link>

                    {/* Cart / Bag */}
                    <Link to="/cart" className="flex flex-col items-center hover:text-accent transition relative tracking-wide">
                        <div className="relative mb-1">
                            <FaShoppingCart className="text-xl sm:text-[22px]" />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-1.5 -right-2.5 bg-accent text-primary text-[10px] font-bold rounded-full h-[18px] min-w-[18px] px-1 flex items-center justify-center leading-none shadow-sm">
                                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                                </span>
                            )}
                        </div>
                        <span className="font-bold text-[10px] sm:text-xs">Bag</span>
                    </Link>
                </nav>
            </div>

            {/* Mobile Layout Extensions */}
            <div className="lg:hidden w-full border-t border-gray-700">
                {/* Mobile Search Bar */}
                <div className="px-4 py-3 md:hidden">
                    <form onSubmit={submitHandler} className="flex relative bg-gray-100/10 rounded-sm overflow-hidden focus-within:bg-white focus-within:text-gray-900 transition-colors group">
                        <div className="pl-3 pr-2 flex items-center justify-center text-gray-400 group-focus-within:text-gray-500">
                            <FaSearch />
                        </div>
                        <input
                            type="text"
                            name="q"
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="Search for products, brands and more"
                            className="w-full py-2.5 px-2 bg-transparent text-white group-focus-within:text-gray-900 placeholder-gray-400 group-focus-within:placeholder-gray-500 outline-none text-sm"
                        />
                    </form>
                </div>
                {/* Mobile Scroller */}
                <div className="text-xs py-2 px-4 flex items-center space-x-5 overflow-x-auto no-scrollbar scroll-smooth">
                    <Link to="/" className="whitespace-nowrap hover:text-accent transition uppercase font-bold tracking-wider text-gray-300">All</Link>
                    <Link to="/?category=Mobile" className="whitespace-nowrap hover:text-accent transition uppercase font-bold tracking-wider text-gray-300">Mobile</Link>
                    <Link to="/?category=Electronics" className="whitespace-nowrap hover:text-accent transition uppercase font-bold tracking-wider text-gray-300">Electronics</Link>
                    <Link to="/?category=Computers" className="whitespace-nowrap hover:text-accent transition uppercase font-bold tracking-wider text-gray-300">Computers</Link>
                    <Link to="/?category=Fashion" className="whitespace-nowrap hover:text-accent transition uppercase font-bold tracking-wider text-gray-300">Fashion</Link>
                    <Link to="/?category=Home%20%26%20Kitchen" className="whitespace-nowrap hover:text-accent transition uppercase font-bold tracking-wider text-gray-300">Home</Link>
                    <Link to="/?category=Shoes" className="whitespace-nowrap hover:text-accent transition uppercase font-bold tracking-wider text-gray-300">Shoes</Link>
                    <Link to="/?category=Groceries" className="whitespace-nowrap hover:text-accent transition uppercase font-bold tracking-wider text-gray-300">Groceries</Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
