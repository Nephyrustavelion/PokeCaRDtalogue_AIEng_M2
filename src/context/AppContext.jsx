import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from 'react';
const AppContext = createContext(null);
export function AppProvider({ children }) {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);
    const login = (name) => setUser(name);
    const logout = () => {
        setUser(null);
        setCart([]);
    };
    const addToCart = (card) => {
        setCart((prev) => {
            if (prev.some((item) => item.card.id === card.id))
                return prev;
            return [...prev, { card }];
        });
    };
    const removeFromCart = (cardId) => {
        setCart((prev) => prev.filter((item) => item.card.id !== cardId));
    };
    const clearCart = () => setCart([]);
    const isInCart = (cardId) => cart.some((item) => item.card.id === cardId);
    return (_jsx(AppContext.Provider, { value: { user, login, logout, cart, addToCart, removeFromCart, clearCart, isInCart }, children: children }));
}
export function useApp() {
    const ctx = useContext(AppContext);
    if (!ctx)
        throw new Error('useApp must be used within AppProvider');
    return ctx;
}
