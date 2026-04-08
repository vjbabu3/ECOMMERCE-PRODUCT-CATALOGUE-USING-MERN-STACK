import React from 'react';

const ShopzoneLogo = ({ className = '' }) => {
    return (
        <svg
            xmlns="http://www.2000/svg"
            viewBox="0 0 200 160"
            className={className}
            fill="none"
        >
            {/* Shopping Cart Handle */}
            <path
                d="M 30 40 C 35 40, 45 45, 50 60 L 65 110 C 68 120, 75 125, 85 125 L 160 125 C 170 125, 175 120, 175 110"
                stroke="#66D3F2"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Cart Basket Background */}
            <path
                d="M 68 50 L 172 50 C 180 50, 183 58, 180 65 L 168 100 C 165 108, 158 112, 150 112 L 85 112 C 75 112, 68 105, 65 95 Z"
                fill="#BBEBFE"
                stroke="#2BB6DF"
                strokeWidth="10"
                strokeLinejoin="round"
            />
            
            {/* Cart Handle Top Arc */}
            <path
                d="M 95 50 C 95 25, 145 25, 145 50"
                stroke="#2BB6DF"
                strokeWidth="10"
                strokeLinecap="round"
                fill="none"
            />

            {/* Wheels */}
            <circle cx="85" cy="145" r="14" fill="#BBEBFE" stroke="#66D3F2" strokeWidth="8" />
            <circle cx="150" cy="145" r="14" fill="#BBEBFE" stroke="#66D3F2" strokeWidth="8" />
            <circle cx="85" cy="145" r="4" fill="#1C3848" />
            <circle cx="150" cy="145" r="4" fill="#1C3848" />
        </svg>
    );
};

export default ShopzoneLogo;
