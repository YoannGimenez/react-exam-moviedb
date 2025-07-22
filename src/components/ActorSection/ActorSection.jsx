import styles from "./ActorSection.module.css";
import {useEffect, useState} from "react";

const ActorSection = ({movieId}) => {

    const [actors, setActors] = useState(null);
    const API_KEY = import.meta.env.VITE_API_KEY;
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`)
            .then(response => response.json())
            .then(data => setActors(data.cast.slice(0, 10)))
    }, []);

    return actors ? (
        <div className={styles.actorsSection}>
            <h2 className={styles.title}>Main Cast</h2>
            <div className={styles.actorsGrid}>
                {actors.map((actor) => (
                    <div key={actor.id} className={styles.actorCard}>
                        {actor.profile_path ? (
                            <img
                                src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                                alt={actor.name}
                                className={styles.moviePoster}
                            />
                        ) : (
                            <div className={styles.placeholder}>?</div>
                        )}
                        <div className={styles.actorName}>{actor.name}</div>
                        <div className={styles.actorRole}>{actor.character}</div>
                    </div>
                ))}
            </div>
        </div>
    ) : (
        <h2 className={styles.title}>Loading cast</h2>
    )
}

export default ActorSection;