import { useState } from 'react';
import axios from 'axios';
import { ApiResponse } from '../types/ApiResponse';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSignup = async () => {
        try {
            setError(null);
            setSuccess(null);
            
            const response = await axios.post<ApiResponse>('https://squid-app-avanu.ondigitalocean.app/api/auth/signup', {
                name,
                email,
                password,
            });
            
            const token = response.data.token;
            localStorage.setItem('token', token);
            setSuccess('Signup successful!');
            
            // Clear the form
            setEmail('');
            setPassword('');
            setName('');
        } catch (err: any) {
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else if (err.response?.status === 401) {
                setError('Password incorrect');
            } else {
                setError('Signup failed. Please try again.');
            }
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
                <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
                    Create your account
                </h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                    />
                    <button
                        onClick={handleSignup}
                        className="w-full rounded-md bg-black py-2 text-white hover:bg-gray-600 focus:outline-none"
                    >
                        Sign Up
                    </button>
                    {error && <p className="text-center text-red-500">{error}</p>}
                    {success && <p className="text-center text-green-500">{success}</p>}
                </div>
            </div>
        </div>
    );
};

export default Signup;
