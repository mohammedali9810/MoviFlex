import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addRemoveFavorite } from "../../../../store/slices/favorite";
import { blue } from "@mui/material/colors";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function SearchList() {
  const params = useParams();
  const [searchList, setSearchList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favoriteArray = useSelector((state) => state.favoriteArray);
  const fetchMovies = () => {
    axios
      .get("https://api.themoviedb.org/3/search/movie", {
        params: {
          api_key: process.env.REACT_APP_API_KEY ,
          query: params.title,
        },
      })
      .then((res) => {
        const results = res.data.results; // Destructure the response
        setSearchList(results);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  };
  useEffect(() => {
    fetchMovies();
  }, [params.title]);

  return (
    <div className="row row-cols-5 ms-5 mb-5 ">
      {searchList.map((movie) => {
        return (
          <div
            className="card h-100 col mx-1   gy-3"
            style={{ width: "17rem", cursor: "pointer" }}
            onClick={() => navigate(`/movie-detail/${movie.id}`)}
          >
            <img
              src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              className="card-img-top rounded position-relative"
              width={"25px"}
              height={"300px"}
              alt="..."
            />
            <div className="text-start mt-2">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="card-text fw-bold " title={movie.title}>
                  {" "}
                  {movie.title.length >= 15
                    ? movie.title.slice(0, 15) + ".."
                    : movie.title}
                </h6>{" "}
                <CircularProgressWithLabel value={movie.vote_average * 10} />
              </div>
              <div className="d-flex justify-content-between align-items-center ">
                <div className=" text-secondary fw-bold">
                  {movie.release_date}
                </div>

                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(addRemoveFavorite(movie));
                  }}
                >
                  {favoriteArray.some(
                    (favoriteMovie) => favoriteMovie.id === movie.id
                  ) ? (
                    <Favorite
                      sx={{ color: blue[300] }}
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    <FavoriteBorder
                      sx={{ color: blue[300] }}
                      style={{ cursor: "pointer" }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="button" component="div" sx={{ fontWeight: 700 }}>
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}
