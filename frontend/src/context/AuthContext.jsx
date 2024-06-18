import { createContext, useContext, useEffect, useState } from 'react';
import { axiosClient } from "../Api/axios";

import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    const csrf = () => axios.get('/sanctum/csrf-cookie');

    const getUser = async () => {
        const { data } = await axios.get('/api/user');
        setUser(data);
    };

    const getMovies = async () => {
        try {
            const { data } = await axios.get('/api/movies');
            setMovies(data);
        } catch (error) {
            console.error('There was an error fetching the movies!', error);
        }
    };

    const login = async (data) => {
        await csrf();
        setErrors([]);
        try {
            await axios.post('/login', data);
            await getUser();
            navigate('/');
        } catch (e) {
            if (e.response && e.response.status === 422) {
                setErrors(e.response.data.errors);
            } else {
                console.error('Login error:', e);
            }
        }
    };

    const register = async (data) => {
        await csrf();
        setErrors([]);
        try {
            await axios.post('/register', data);
            await getUser();
            navigate('/');
        } catch (e) {
            if (e.response && e.response.status === 422) {
                setErrors(e.response.data.errors);
            }
        }
    };

    const logout = () => {
        axios.post('/logout').then(() => {
            setUser(null);
        });
    };

    useEffect(() => {
        if (!user) {
            getUser();
        }
    }, []);

    useEffect(() => {
        getMovies();
    }, []);

    return (
        <AuthContext.Provider value={{ movies, user, errors, getUser, login, register, logout, csrf }}>
            {children}
        </AuthContext.Provider>
    );
};

export default function useAuthContext() {
    return useContext(AuthContext);
}