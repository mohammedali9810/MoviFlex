import React, { useEffect, useState } from "react";
import Searchcomp from "./components/SearchField";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Card from "../Home/components/Card";

export default function Search() {
  const params = useParams();
  const [searchList, setSearchList] = useState([]);
  const navigate = useNavigate();

  const fetchMovies = () => {
    axios
      .get("https://api.themoviedb.org/3/search/movie", {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          query: params.title,
        },
      })
      .then((res) => {
        const results = res.data.results; // Destructure the response
        setSearchList(results);
      })
      .catch((err) => {
        navigate("/not-found");
      });
  };
  useEffect(() => {
    fetchMovies();
  }, [params.title]);

  return (
    <div className="">
      <Searchcomp />
      <Card movieList={searchList} />
    </div>
  );
}
