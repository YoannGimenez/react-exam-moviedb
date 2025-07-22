import { Link } from "react-router";
import styles from "./Navbar.module.css";

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.left}>
                <Link to="/" className={styles.title}>🎥 Moovyze</Link>
            </div>
            <div className={styles.right}>
                <Link to="/wishlist" className={styles.wishlistButton}>
                   My Wishlist ❤️
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
