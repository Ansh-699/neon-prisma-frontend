import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ApiResponse } from '../types/ApiResponse';
import { GoogleLogin } from '@react-oauth/google';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [googleLoginMessage, setGoogleLoginMessage] = useState<string | null>(null);

    const handleSignup = async () => {
        try {
            setError(null);
            setSuccess(null);
            setGoogleLoginMessage(null);

            const response = await axios.post<ApiResponse>(
                'https://squid-app-avanu.ondigitalocean.app/api/auth/signup',
                {
                    name,
                    email,
                    password,
                }
            );

            const token = response.data.token;
            localStorage.setItem('token', token);
            setSuccess('Signup successful!');

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

    const handleGoogleSuccess = (credentialResponse: any) => {
        console.log('Google Credentials:', credentialResponse);
        setGoogleLoginMessage('Login successful!');
        setError(null);
    };

    const handleGoogleError = () => {
        setGoogleLoginMessage(null);
        setError('Google login failed. Please try again.');
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

                    {/* Error and Success Messages */}
                    {error && <p className="text-center text-red-500">{error}</p>}
                    {success && <p className="text-center text-green-500">{success}</p>}
                    {googleLoginMessage && (
                        <p className="text-center text-green-500">{googleLoginMessage}</p>
                    )}
                </div>

                {/* Separator */}
                <div className="my-6 flex items-center justify-center">
                    <div className="w-full border-t border-gray-300"></div>
                    <div className="mx-3 text-gray-500">or</div>
                    <div className="w-full border-t border-gray-300"></div>
                </div>

                {/* Google Login Button */}
                <div className="mt-4 flex justify-center">
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                    />
                </div>

                <p className="mt-6 text-center text-gray-600">
                    Already have an account?{' '}
                    <Link
                        to="/signin"
                        className="font-semibold text-blue-600 hover:underline"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
