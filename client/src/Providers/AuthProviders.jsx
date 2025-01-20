import PropTypes from 'prop-types';
import { createContext, useState, useEffect } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const parseJwt = (token) => {
    if (!token) return null; // Ensure token is not null or undefined
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error('Failed to parse token:', e);
        return null; // Return null if parsing fails
    }
};

const AuthProviders = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = parseJwt(token);
            console.log(decoded);
            if (decoded && decoded.email && decoded.role) {
                setUser({ email: decoded.email, role: decoded.role, user: decoded.user });
            } else {
                //    console.error('Invalid token payload:', decoded);
                setUser(null); // Clear user if the token is invalid
            }
        }
    }, []);

    const login = (token) => {
        const decoded = parseJwt(token);
        if (decoded && decoded.email && decoded.role) {
            localStorage.setItem('token', token);
            localStorage.setItem('role', decoded.role);

            setUser({ email: decoded.email, role: decoded.role, user: decoded.user });
        } else {
            console.error('Invalid token during login:', decoded);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role')
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProviders.propTypes = {
    children: PropTypes.node,
};

export default AuthProviders;