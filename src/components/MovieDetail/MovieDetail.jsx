import styles from "./MovieDetail.module.css";
import {Link, useParams} from "react-router";
import {useEffect, useState} from "react";
import {useWishlist} from "../../context/WishlistProvider.jsx";
import ActorSection from "../ActorSection/ActorSection.jsx";

const MovieDetail = () => {

    const {id} = useParams();
    const API_KEY = import.meta.env.VITE_API_KEY;
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const [movie, setMovie] = useState(null);
    const {wishlist, addToWishlist, removeFromWishlist} = useWishlist();
    const isInWishlist = wishlist.some((wishlistMovie) => wishlistMovie.id === movie?.id);
    const [similarMovies, setSimilarMovies] = useState([]);

    useEffect(() => {
        fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
            .then(response => response.json())
            .then(data => setMovie(data));

        fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`)
            .then(response => response.json())
            .then(data => setSimilarMovies(data.results.slice(0, 6)));
        window.scrollTo(0, 0);
    }, [id]);



    return movie ? (
        <div>
            <div className={styles.detailContainer}>
                <div className={styles.posterWrapper}>
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className={styles.poster}
                    />
                </div>
                <div className={styles.info}>
                    <h1 className={styles.title}>{movie.title}</h1>
                    <button className={styles.wishlistButton}
                            onClick={() => {
                                if (isInWishlist) removeFromWishlist(movie.id);
                                else addToWishlist(movie);
                            }}
                    >
                        {isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                    </button>
                    <p className={styles.meta}>
                        ⭐ {Math.round(movie.vote_average * 10) / 10} / 10 •
                        🗓️ {movie.release_date} •
                        🎭 {movie.genres.map(g => g.name).join(', ')}
                    </p>
                    <p className={styles.tagline}>{movie.tagline}</p>
                    <p className={styles.overview}>{movie.overview}</p>
                </div>
            </div>
            <ActorSection movieId={id} />
            {similarMovies.length > 0 && (
                <div className={styles.similarSection}>
                    <h2 className={styles.title}>Similar movies</h2>
                    <div className={styles.similarGrid}>
                        {similarMovies.map((movie) => (
                            <Link to={`/movie/${movie.id}`} key={movie.id} className={styles.similarCard}>
                                {movie.poster_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        className={styles.moviePoster}
                                    />
                                ) : (
                                    <div className={styles.placeholder}>?</div>
                                )}
                                <div className={styles.similarTitleText}>{movie.title}</div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>

    ) : (
        <p style={{color: "white", padding: "2rem"}}>Loading...</p>
    );
};

export default MovieDetail;
