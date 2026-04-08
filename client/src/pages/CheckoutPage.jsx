import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, CreditCard, Truck, ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react';

const CheckoutPage = () => {
    const { cartItems, clearCart } = useCart();
    const { userInfo } = useUser();
    const navigate = useNavigate();

    const [isOrdered, setIsOrdered] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Form states
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('India');

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const shipping = 15.00;
    const total = subtotal + shipping;

    useEffect(() => {
        if (!userInfo) {
            navigate('/login?redirect=checkout');
        } else if (cartItems.length === 0 && !isOrdered) {
            navigate('/cart');
        }
    }, [userInfo, cartItems, navigate, isOrdered]);

    if (!userInfo || (cartItems.length === 0 && !isOrdered)) return null;

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const orderData = {
                orderItems: cartItems,
                shippingAddress: { address, city, postalCode, country },
                paymentMethod: 'Credit Card', // Hardcoded for simplicity in this flow
                itemsPrice: subtotal,
                shippingPrice: shipping,
                taxPrice: 0,
                totalPrice: total,
            };

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.post('/api/orders', orderData, config);

            // Immediately mark as paid for "Premium" experience simulation
            // In a real app, this would happen after Stripe/Payment confirmation
            await axios.put(`/api/orders/${data._id}/pay`, {
                id: 'SIMULATED_PAYMENT_ID',
                status: 'succeeded',
                update_time: new Date().toISOString(),
                payer: { email_address: userInfo.email }
            }, config);

            setIsOrdered(true);
            clearCart();
            setLoading(false);

            // Auto redirect after 6s
            setTimeout(() => {
                navigate('/orders');
            }, 6000);
        } catch (err) {
            setError(err.response && err.response.data.message ? err.response.data.message : err.message);
            setLoading(false);
        }
    };

    if (isOrdered) {
        return (
            <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center animate-[fadeIn_0.8s_ease-out]">
                <div className="bg-green-100 p-8 rounded-full mb-8 animate-[pulse-glow_2s_infinite]">
                    <CheckCircle size={80} className="text-green-500" />
                </div>
                <h1 className="text-5xl font-black mb-4 text-gray-900">Order Confirmed</h1>
                <p className="text-gray-500 text-xl font-medium mb-12 max-w-md text-center leading-relaxed">
                    Thank you for your purchase! Your premium items are being prepared for dispatch. Check your inbox for the receipt.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/" className="btn btn-primary px-10 py-5 text-lg min-w-[220px]">
                        Continue Shopping
                    </Link>
                    <Link to="/orders" className="btn bg-white border-2 border-gray-100 text-gray-700 px-10 py-5 text-lg hover:border-accent hover:text-accent min-w-[220px] shadow-sm">
                        View Order Status
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <Link to="/cart" className="group flex items-center gap-2 text-gray-400 hover:text-accent font-bold mb-10 transition-all duration-300">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span className="tracking-widest uppercase text-xs">Back to My Bag</span>
            </Link>

            <h1 className="text-6xl font-black mb-16 tracking-tighter text-gray-900 leading-none">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-16 items-start">
                {/* Form Section */}
                <form onSubmit={handlePlaceOrder} className="flex flex-col gap-10">
                    {/* Shipping */}
                    <div className="glass p-10 rounded-[var(--radius)]">
                        <h3 className="flex items-center gap-4 text-3xl font-black mb-10 text-gray-900 border-b pb-6 border-gray-100">
                            <Truck size={32} className="text-accent" /> Shipping Destination
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="md:col-span-2">
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">Street Address</label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="e.g. 123 Luxury Avenue"
                                    required
                                    className="w-full bg-gray-50/70 border-2 border-transparent focus:bg-white focus:border-accent/40 p-5 rounded-2xl outline-none transition-all duration-300 font-medium placeholder:font-normal"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">City</label>
                                <input
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder="City"
                                    required
                                    className="w-full bg-gray-50/70 border-2 border-transparent focus:bg-white focus:border-accent/40 p-5 rounded-2xl outline-none transition-all duration-300 font-medium shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">Postal Code</label>
                                <input
                                    type="text"
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    placeholder="ZIP Code"
                                    required
                                    className="w-full bg-gray-50/70 border-2 border-transparent focus:bg-white focus:border-accent/40 p-5 rounded-2xl outline-none transition-all duration-300 font-medium shadow-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="glass p-10 rounded-[var(--radius)]">
                        <h3 className="flex items-center gap-4 text-3xl font-black mb-10 text-gray-900 border-b pb-6 border-gray-100">
                            <CreditCard size={32} className="text-accent" /> Payment Method
                        </h3>
                        <div className="bg-cyan-50/50 p-6 rounded-2xl mb-12 flex items-center gap-5 text-cyan-700 font-bold text-sm border border-cyan-100/50 shadow-inner">
                            <ShieldCheck size={28} className="shrink-0" />
                            Secure processing enabled. Your data is encrypted using military-grade standards.
                        </div>
                        <div className="flex flex-col gap-8">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">Card Number</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="0000 0000 0000 0000"
                                        required
                                        className="w-full bg-gray-50/70 border-2 border-transparent focus:bg-white focus:border-accent/40 p-5 rounded-2xl outline-none transition-all duration-300 font-bold tracking-widest placeholder:font-normal placeholder:tracking-normal"
                                    />
                                    <CreditCard className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300" size={24} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">Expiration Date</label>
                                    <input type="text" placeholder="MM/YY" required className="w-full bg-gray-50/70 border-2 border-transparent focus:bg-white focus:border-accent/40 p-5 rounded-2xl outline-none transition-all duration-300 font-bold" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">Security Code (CVV)</label>
                                    <input type="password" placeholder="***" maxLength={3} required className="w-full bg-gray-50/70 border-2 border-transparent focus:bg-white focus:border-accent/40 p-5 rounded-2xl outline-none transition-all duration-300 font-bold" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="p-6 bg-red-100/80 backdrop-blur-sm text-red-700 rounded-[var(--radius)] font-black text-center shadow-lg border border-red-200 animate-bounce">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary py-6 text-2xl relative group overflow-hidden disabled:opacity-70 disabled:cursor-wait"
                    >
                        {loading ? (
                            <div className="flex items-center gap-4">
                                <Loader2 className="animate-spin" size={28} />
                                <span>Securing Order...</span>
                            </div>
                        ) : (
                            <>
                                <span className="relative z-10 group-hover:translate-x-[-15px] transition-transform duration-500 ease-in-out">Place Order</span>
                                <span className="absolute right-[-60px] group-hover:right-10 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out text-3xl">→</span>
                            </>
                        )}
                    </button>
                </form>

                {/* Summary Section */}
                <div className="glass p-10 rounded-[var(--radius)] sticky top-28 border border-accent/20 flex flex-col h-fit">
                    <h3 className="text-3xl font-black mb-10 text-gray-900">Your Selection</h3>
                    <div className="flex flex-col gap-6 max-h-[45vh] overflow-y-auto no-scrollbar mb-10 pr-2">
                        {cartItems.map(item => (
                            <div key={item._id} className="flex justify-between items-center group cursor-default">
                                <div className="flex items-center gap-5">
                                    <div className="relative overflow-hidden rounded-2xl shadow-md bg-gray-100 group-hover:scale-105 transition-transform duration-300">
                                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
                                        <div className="absolute top-0 right-0 bg-accent text-white font-black text-[10px] w-6 h-6 flex items-center justify-center rounded-bl-xl shadow-inner">
                                            {item.qty}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-black text-gray-900 leading-tight group-hover:text-accent transition-colors">{item.name}</h4>
                                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-1.5">Premium Item</p>
                                    </div>
                                </div>
                                <span className="font-black text-xl text-gray-900">₹{(item.price * item.qty).toLocaleString()}</span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t-2 border-gray-100/50 pt-10 mt-auto space-y-6">
                        <div className="flex justify-between text-gray-400 uppercase text-[10px] font-black tracking-[0.3em]">
                            <span>Subtotal</span>
                            <span className="text-gray-900">₹{subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-gray-400 uppercase text-[10px] font-black tracking-[0.3em]">
                            <span>Shipping Essence</span>
                            <span className="text-gray-900">₹{shipping.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-end pt-8 border-t-2 border-dotted border-gray-200">
                            <div>
                                <span className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-1">Grand Total Bill</span>
                                <span className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Amount to Pay</span>
                            </div>
                            <span className="text-5xl font-black text-accent drop-shadow-md tracking-tighter">₹{total.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
