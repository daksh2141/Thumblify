import React, { createContext, useContext, useEffect, useState } from "react";
import type { IUser } from "../assets/assets";
import api from "../configs/api";
import toast from "react-hot-toast";

interface AuthContextProps {
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    user: IUser | null;
    setUser: (user: IUser | null) => void;
    login: (credentials: { email: string; password: string }) => Promise<void>;
    signUp: (userData: { name: string; email: string; password: string }) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean; // Vital for refresh persistence
}

const AuthContext = createContext<AuthContextProps>({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    user: null,
    setUser: () => {},
    login: async () => {},
    signUp: async () => {},
    logout: async () => {},
    loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    // Verify user session on page load/refresh
    const fetchUser = async () => {
        try {
            const { data } = await api.get('/api/auth/verify');
            if (data.user) {
                setUser(data.user as IUser);
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.log("No active session found.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const signUp = async ({ name, email, password }: { name: string; email: string; password: string }) => {
        try {
            const { data } = await api.post('/api/auth/register', { name, email, password });
            if (data.user) {
                setUser(data.user as IUser);
                setIsLoggedIn(true);
                toast.success(data.message || "Account created!");
            }
        } catch (error: any) {
            const message = error.response?.data?.message || "Registration failed";
            toast.error(message);
        }
    };

    const login = async ({ email, password }: { email: string; password: string }) => {
        try {
            const { data } = await api.post('/api/auth/login', { email, password });
            if (data.user) {
                setUser(data.user as IUser);
                setIsLoggedIn(true);
                toast.success(data.message || "Logged in successfully");
            }
        } catch (error: any) {
            const message = error.response?.data?.message || "Login failed";
            toast.error(message);
        }
    };

    const logout = async () => {
        try {
            const { data } = await api.post('/api/auth/logout');
            setUser(null);
            setIsLoggedIn(false);
            toast.success(data.message || "Logged out");
        } catch (error: any) {
            toast.error("Logout failed");
        }
    };

    const value = {
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        signUp,
        login,
        logout,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {/* Prevent rendering the app until the verify check is done */}
            {!loading ? children : null}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);