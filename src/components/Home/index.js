import React, { useEffect, useState } from "react";
import Search from "./components/Search";
import Paginationcomp from "./components/Pagination";
import Card from "./components/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const [movieList, setMovieList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch movie data when the component mounts
    fetchMovies();
  }, [currentPage]);

  const fetchMovies = () => {
    axios
      .get("https://api.themoviedb.org/3/movie/popular", {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          page: currentPage,
        },
      })
      .then((res) => {
        const results = res.data.results; // Destructure the response
        setMovieList(results);
      })
      .catch((err) => {
        navigate("/not-found");
      });
  };

  const totalPages = 500;
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo(0, 0);
    }
  };
  return (
    <>
      <Search />
      <Card movieList={movieList} />
      <Paginationcomp
        handlePageChange={handlePageChange}
        currentPage={currentPage}
      />
    </>
  );
}
