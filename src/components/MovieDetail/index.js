import React, { useEffect, useState } from "react";
import DetailCard from "./components/DetailCard";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Card from "../Home/components/Card";
export default function MovieDetail() {
  const [movieList, setMovieList] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${params.id}/recommendations?`, {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
        },
      })
      .then((res) => {
        setMovieList(res.data.results.slice(0, 5));
      })
      .catch((err) => {
        navigate("/not-found");
      });
  }, [params.id]);
  return (
    <div className="mb-5">
      <DetailCard />
      <h1 className=" text-start ms-4">Recommendations</h1>
      <Card movieList={movieList} />
    </div>
  );
}
