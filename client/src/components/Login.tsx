import React, { useEffect, useState } from 'react';
import SoftBackdrop from './SoftBackdrop';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react'; // Using lucide-react for cleaner icons

const Login = () => {
    const [state, setState] = useState<"login" | "register">("login");
    const [isLoading, setIsLoading] = useState(false);
    const { user, login, signUp } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    // Reset form when switching between Login and Register
    useEffect(() => {
        setFormData({ name: '', email: '', password: '' });
    }, [state]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (state === 'login') {
                await login({ email: formData.email, password: formData.password });
            } else {
                await signUp(formData);
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <>
            <SoftBackdrop />
            <div className='min-h-screen flex items-center justify-center p-4'>
                <form
                    onSubmit={handleSubmit}
                    className="w-full sm:w-[380px] text-center bg-white/5 border border-white/10 rounded-2xl px-8 py-10 backdrop-blur-md"
                >
                    <h1 className="text-white text-3xl font-semibold tracking-tight">
                        {state === "login" ? "Welcome Back" : "Create Account"}
                    </h1>
                    <p className="text-gray-400 text-sm mt-2 mb-8">
                        {state === "login" ? "Please sign in to continue" : "Join us to start generating"}
                    </p>

                    {/* Name Input - Only for Register */}
                    {state !== "login" && (
                        <div className="flex items-center mt-4 w-full bg-white/5 ring-1 ring-white/10 focus-within:ring-2 focus-within:ring-pink-500/50 h-12 rounded-full overflow-hidden pl-5 gap-3 transition-all">
                            <User size={18} className="text-white/50" />
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                className="w-full bg-transparent text-white placeholder-white/40 border-none outline-none text-sm"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}

                    {/* Email Input */}
                    <div className="flex items-center mt-4 w-full bg-white/5 ring-1 ring-white/10 focus-within:ring-2 focus-within:ring-pink-500/50 h-12 rounded-full overflow-hidden pl-5 gap-3 transition-all">
                        <Mail size={18} className="text-white/50" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            className="w-full bg-transparent text-white placeholder-white/40 border-none outline-none text-sm"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="flex items-center mt-4 w-full bg-white/5 ring-1 ring-white/10 focus-within:ring-2 focus-within:ring-pink-500/50 h-12 rounded-full overflow-hidden pl-5 gap-3 transition-all">
                        <Lock size={18} className="text-white/50" />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full bg-transparent text-white placeholder-white/40 border-none outline-none text-sm"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {state === "login" && (
                        <div className="mt-4 text-right">
                            <button type="button" className="text-xs text-pink-400 hover:text-pink-300 transition-colors">
                                Forgot password?
                            </button>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="mt-6 w-full h-11 rounded-full text-white bg-pink-600 hover:bg-pink-500 active:scale-[0.98] transition-all font-medium disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Processing..." : state === "login" ? "Login" : "Sign up"}
                    </button>

                    <p className="text-gray-400 text-sm mt-6">
                        {state === "login" ? "Don't have an account?" : "Already have an account?"}
                        <button
                            type="button"
                            onClick={() => setState(prev => prev === "login" ? "register" : "login")}
                            className="text-pink-400 hover:underline ml-1 font-medium"
                        >
                            {state === "login" ? "Sign up" : "Login"}
                        </button>
                    </p>
                </form>
            </div>
        </>
    );
};

export default Login;