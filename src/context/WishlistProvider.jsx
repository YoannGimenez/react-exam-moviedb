import React, {createContext, useContext, useEffect, useState} from "react";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState(() => {
        const stored = localStorage.getItem("wishlist");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (movie) => {
        setWishlist((prev) => {
            if (prev.find((m) => m.id === movie.id)) return prev;
            return [...prev, movie];
        });
    };

    const removeFromWishlist = (movieId) => {
        setWishlist((prev) => prev.filter((m) => m.id !== movieId));
    };

    return (
        <WishlistContext.Provider
            value={{ wishlist, addToWishlist, removeFromWishlist }}
        >
            {children}
        </WishlistContext.Provider>
    );
};
