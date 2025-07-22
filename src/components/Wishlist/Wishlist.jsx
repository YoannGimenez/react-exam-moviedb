import React from "react";
import { useWishlist } from "../../context/WishlistProvider.jsx";
import styles from "./Wishlist.module.css";

const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useWishlist();

    if (wishlist.length === 0) {
        return <p className={styles.empty}>Your wishlist is empty.</p>;
    }

    return (
        <div className={styles.wishlistContainer}>
            <h2>My Wishlist</h2>
            <ul className={styles.list}>
                {wishlist.map((movie) => (
                    <li key={movie.id} className={styles.movieItem}>
                        <img
                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                            alt={movie.title}
                            className={styles.poster}
                        />
                        <div className={styles.info}>
                            <h3>{movie.title}</h3>
                            <button
                                className={styles.removeButton}
                                onClick={() => removeFromWishlist(movie.id)}
                            >
                                Remove
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Wishlist;
