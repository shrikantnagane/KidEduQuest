import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for saved token/user on mount
        const savedUser = localStorage.getItem('kidEduUser');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (res.ok) {
                setUser(data.user);
                localStorage.setItem('kidEduUser', JSON.stringify(data.user));
                localStorage.setItem('token', data.token); // Store token
                return true;
            } else {
                alert(data.msg || 'Login failed');
                return false;
            }
        } catch (err) {
            console.error(err);
            alert('Server error');
            return false;
        }
    };

    const signup = async (name, email, phone, password) => {
        try {
            const res = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, phone, password })
            });
            const data = await res.json();

            if (res.ok) {
                setUser(data.user);
                localStorage.setItem('kidEduUser', JSON.stringify(data.user));
                localStorage.setItem('token', data.token);
                return true;
            } else {
                alert(data.msg || 'Signup failed');
                return false;
            }
        } catch (err) {
            console.error(err);
            alert('Server error');
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('kidEduUser');
        localStorage.removeItem('token');
    };

    const updateProgress = async (points, activity) => {
        if (!user) return;

        // Optimistic UI Update
        const updatedUser = {
            ...user,
            points: (user.points || 0) + (points || 0),
            history: activity ? [activity, ...(user.history || [])] : user.history
        };
        setUser(updatedUser);
        localStorage.setItem('kidEduUser', JSON.stringify(updatedUser)); // Keep local sync

        try {
            await fetch('http://localhost:5000/api/user/progress', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'x-auth-token': localStorage.getItem('token') // Add if middleware exists
                },
                body: JSON.stringify({
                    userId: user.id,
                    points: points || 0,
                    activity: activity
                })
            });
        } catch (err) {
            console.error('Failed to sync progress', err);
            // Optionally revert state? For now, optimistic is fine.
        }
    };

    const addPoints = (amount) => {
        updateProgress(amount, null);
    };

    const addHistory = (activity) => {
        updateProgress(0, activity);
    };

    const value = {
        user,
        login,
        signup,
        logout,
        addPoints,
        addHistory,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
