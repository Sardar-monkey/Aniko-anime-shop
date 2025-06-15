import { createContext, useContext, useEffect, useState } from "react";

const CorsinaContext = createContext();

export function useCorsinaContext() {
    return useContext(CorsinaContext);
}

export function CorsinaProvider({ children }) {
    const [corsinaItems, setCorsinaItems] = useState(() => {
        try {
            const savedItems = localStorage.getItem("corsinaItems");
            return savedItems ? JSON.parse(savedItems) : [];
        } catch (error) {
            console.error("Error loading corsina items from localStorage:", error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem("corsinaItems", JSON.stringify(corsinaItems));
        } catch (error) {
            console.error("Error saving corsina items to localStorage:", error);
        }
    }, [corsinaItems]);

    const addToCorsina = (item) => {
        setCorsinaItems((prevItems) => {
            const existingItem = prevItems.find((i) => i.id === item.id);
            if (existingItem) {
                return prevItems.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            } else {
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
        alert("Товар добавлен в корзину");
    };

    const removeFromCorsina = (itemId) => {
        setCorsinaItems((prevItems) =>
            prevItems.filter((item) => item.id !== itemId)
        );
        alert("Товар удален из корзины");
    };

    const increseQuantity = (itemId) => {
        setCorsinaItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQuantity = (itemId) => {
        setCorsinaItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId
                    ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
                    : item
            )
        );
    };

    const ClearCorsina = () => {
        setCorsinaItems([]);
    };

    const TotalQuantity = corsinaItems.reduce((total, item) => total + item.quantity, 0);
    const TotalPrice = corsinaItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const value = {
        corsinaItems,
        addToCorsina,
        removeFromCorsina,
        increseQuantity,
        decreaseQuantity,
        TotalQuantity,
        TotalPrice,
        ClearCorsina 
    };

    return (
        <CorsinaContext.Provider value={value}>
            {children}
        </CorsinaContext.Provider>
    );
}
