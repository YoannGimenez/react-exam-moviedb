import {useEffect, useRef, useState} from "react";
import MovieCard from "../MovieCard/MovieCard.jsx";
import styles from "./MovieList.module.css";

const MovieList = () => {

    const CATEGORY_ENDPOINTS = {
        "Now Playing": "now_playing",
        "Popular": "popular",
        "Top Rated": "top_rated",
        "Upcoming": "upcoming"
    };
    const API_KEY = import.meta.env.VITE_API_KEY;
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const [movies, setMovies] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Popular");
    const [search, setSearch] = useState("");
    const debounceTimeout = useRef(null);


    useEffect(() => {
        if (search.trim().length === 0) {
            const categoryPath = CATEGORY_ENDPOINTS[selectedCategory];
            const url = `${BASE_URL}/movie/${categoryPath}?api_key=${API_KEY}`;

            fetch(url)
                .then(response => response.json())
                .then(data => setMovies(data.results))
        }
    }, [selectedCategory, search]);


    useEffect(() => {
        if (search.trim().length === 0) return;

        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

        debounceTimeout.current = setTimeout(() => {
            const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${search}`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => setMovies(data.results))
            .catch(() => setMovies([]));
        }, 300);

        return () => clearTimeout(debounceTimeout.current);

    }, [search]);



    return(
        <div className={styles.movieListContainer}>
            <input
                type="text"
                placeholder="Search a movie..."
                className={styles.searchInput}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className={styles.filters}>
                {Object.keys(CATEGORY_ENDPOINTS).map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`${styles.filterButton} ${selectedCategory === category ? styles.activeFilter : ""}`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className={styles.movieGrid}>
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie}/>
                ))}
            </div>
        </div>
    )

}

export default MovieList;