import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./card.css";
import { Link } from "react-router-dom";

const Cards = ({ movie }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer); // Cleanup timeout
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="cards">
                    <SkeletonTheme color="#202020" highlightColor="#444">
                        <Skeleton height={300} duration={2} />
                    </SkeletonTheme>
                </div>
            ) : (
                <Link to={`/movie/${movie?.id}`} className="link-style">
                    <div className="cards">
                        <img
                            className="cards__img"
                            src={`https://image.tmdb.org/t/p/original${movie?.poster_path || ""}`}
                            alt={movie?.original_title || "Movie Poster"}
                        />
                        <div className="cards__overlay">
                            <div className="card__title">{movie?.original_title || "Untitled"}</div>
                            <div className="card__runtime">
                                {movie?.release_date || "Unknown"}
                                <span className="card__rating">
                                    {movie?.vote_average || "N/A"}
                                    <i className="fas fa-star" />
                                </span>
                            </div>
                            <div className="card__description">
                                {movie?.overview ? `${movie.overview.slice(0, 118)}...` : "No description available."}
                            </div>
                        </div>
                    </div>
                </Link>
            )}
        </>
    );
};

export default Cards;
