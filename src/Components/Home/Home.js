import React from "react";
import Banner from "../Banner/Banner";
import Nav from "../Navbar/Nav";
import Row from "../Rows/Row";
import requests from "../Request/requests";
import "./Home.css";

function Home() {
  // Home page
  return (
    <div className="Home">
      <Banner />
      <Nav />
      {/* to display the movie title and movie data */}
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow={true}
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
}

export default Home;
