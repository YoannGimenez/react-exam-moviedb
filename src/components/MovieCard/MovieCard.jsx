import {Link} from "react-router";
import styles from "./MovieCard.module.css";

const MovieCard = ({ movie }) => {

    return (
        <div className={styles.movieCard}>
            {movie.poster_path ? (
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className={styles.moviePoster}
                />
            ) : (
                <div className={styles.placeholder}>?</div>
            )}
            <div className={styles.movieInfo}>
                <h2 className={styles.movieTitle}>{movie.title}</h2>
                <p className={styles.movieRating}>{Math.round(movie.vote_average * 10) / 10} / 10 ⭐</p>
                <Link to={`/movie/${movie.id}`}>
                    <button className={styles.detailsButton}>View details</button>
                </Link>
            </div>
        </div>
    )
}

export default MovieCard;