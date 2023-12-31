import React, { useEffect, useState } from "react";
import axios from "../../Axios/axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

//to get the image of the movies
const base_url = "https://image.tmdb.org/t/p/original/";

//receives the data as props
function Row({ title, fetchUrl, isLargeRow }) {
  //to update the state of the movies and trailerUrl
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  //to pre-populate the movies details
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  //describes the video display
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  //function to play the trailer
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(
        movie?.name ||
          movie?.title ||
          movie?.id ||
          movie?.original_name ||
          movie?.original_title
      )
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {movies.map((movies) => {
          return (
            <img
              key={movies.id}
              onClick={() => handleClick(movies)}
              className={`row_poster ${isLargeRow && "row_posterLarge"}`}
              src={`${base_url}${
                isLargeRow ? movies.poster_path : movies.backdrop_path
              }`}
              alt={movies.title}
            />
          );
        })}
      </div>
      {/* for playing the trailer */}
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
