import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ApiResponse } from '../types/ApiResponse';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSignIn = async () => {
        try {
            const response = await axios.post<ApiResponse>(
                'https://squid-app-avanu.ondigitalocean.app/api/auth/signin',
                {
                    email,
                    password,
                }
            );
            const token = response.data.token;
            localStorage.setItem('token', token);
            setSuccess('Login successful!');
            setError(null);
        } catch (err: any) {
            setSuccess(null);
            setError(err.response?.data?.message || 'Incorrect password or email');
            console.error(err);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
                <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">Sign In</h2>
                <div className="space-y-4">
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
                        onClick={handleSignIn}
                        className="w-full rounded-md bg-black py-2 text-white hover:bg-gray-600 focus:outline-none"
                    >
                        Sign In
                    </button>
                    {error && <p className="text-center text-red-500">{error}</p>}
                    {success && <p className="text-center text-green-500">{success}</p>}
                </div>

                {/* Add the Sign-Up Link */}
                <p className="mt-4 text-center text-gray-600">
                    Dont have an account?{' '}
                    <Link
                        to="/signup"
                        className="font-semibold text-blue-600 hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
