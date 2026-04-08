import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../context/UserContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useUser();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/users/login', {
                email,
                password,
            });
            login(data);
            navigate('/');
        } catch (error) {
            setError(error.response?.data?.message || 'Invalid email or password');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md border border-gray-200">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Sign In</h1>
                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Email Address</label>
                        <input
                            type="email"
                            className="w-full border rounded px-3 py-2 outline-none focus:border-accent"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="username"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full border rounded px-3 py-2 outline-none focus:border-accent"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-accent text-primary font-bold py-2 rounded hover:opacity-90 transition">
                        Sign In
                    </button>
                </form>
                <div className="mt-4 text-sm text-gray-600">
                    New Customer? <Link to="/register" className="text-blue-600 hover:underline">Start here.</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
