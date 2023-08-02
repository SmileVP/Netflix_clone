import React, { useEffect, useState } from "react";
import requests from "../Request/requests";
import axios from "../../Axios/axios";
import "./Banner.css";
import movieTrailer from "movie-trailer";

function Banner() {
  //to update the movie and trailer url using useState
  const [movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  //to pre_populate the random movie details in the banner
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      //to get random movie data
      let movieData =
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ];
      setMovie(movieData);
      return request;
    }
    fetchData();
  }, []);

  //to shorten the description by using (...)
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

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
          //to open the trailer in new window
          window.open(url, "_blank");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover", //covers the entire container
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button" onClick={() => handleClick(movie)}>
            Play
          </button>
        </div>

        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner_fadeBottom" />
    </header>
  );
}

export default Banner;
