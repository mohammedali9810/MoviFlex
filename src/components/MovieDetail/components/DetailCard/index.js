import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addRemoveFavorite } from "../../../../store/slices/favorite";
import { blue } from "@mui/material/colors";
export default function DetailCard() {
  const [movie, setMovie] = useState({});
  const params = useParams();
  const navigate = useNavigate();
  const favoriteArray = useSelector((state) => state.favoriteArray);
  const [companyPoster, setCompanyPoster] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${params.id}}`, {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
        },
      })
      .then((res) => {
        // setMovie(res.data.results);
        setMovie(res.data);
        let companyWithLogo = res.data.production_companies?.find(
          (company) => company.logo_path !== null
        );
        if (companyWithLogo) {
          setCompanyPoster(companyWithLogo.logo_path);
        }
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        navigate("/not-found");
      });
  }, [params.id]);

  return (
    <div>
      <div className="p-4 row row-cols-sm-1 row-cols-lg-2">
        <div className=" col-4">
          <img
            className=" rounded  "
            src={`http://image.tmdb.org/t/p/w500${movie.poster_path}`}
            width={"400px"}
            height={"500px"}
            alt="/"
          />
        </div>
        <div className=" col-8 text-start pt-2">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="fw-bold">{movie.title}</h1>
            <div
              onClick={(e) => {
                dispatch(addRemoveFavorite(movie));
              }}
            >
              {favoriteArray.some(
                (favoriteMovie) => favoriteMovie.id === movie.id
              ) ? (
                <Favorite
                  sx={{ color: blue[700] }}
                  style={{ cursor: "pointer" }}
                  fontSize="large"
                />
              ) : (
                <FavoriteBorder
                  sx={{ color: blue[700] }}
                  fontSize="large"
                  style={{ cursor: "pointer" }}
                />
              )}
            </div>
          </div>
          <h6 className="text-secondary">{movie.release_date}</h6>
          <div className="rating my-3 d-flex flex-inline align-items-center">
            <h6 className="me-3">
              {movie.vote_average && (
                <Rating
                  name="customized-10"
                  defaultValue={movie.vote_average}
                  max={10}
                  precision={0.5}
                  readOnly
                  sx={{ color: blue[700] }}
                />
              )}
            </h6>{" "}
            <h6>{movie.vote_count}</h6>
          </div>
          <h4 className="my-3">{movie.overview}</h4>
          <div className="catg d-flex flex-inline my-4">
            {movie?.genres?.map((catg) => {
              console.log(movie);
              return (
                <div className="bg-primary px-3 py-1 rounded me-2 fs-5 fw-bold">
                  {" "}
                  {catg.name}
                </div>
              );
            })}
          </div>
          <div className="d-flex flex-inline fs-5 align-items-center">
            <p className="me-4 ">
              <span className="fw-bold me-3 ">Duration: </span>
              {movie.runtime} minutes{" "}
            </p>
            <p>
              <span className="fw-bold me-3">Languages: </span>
              {movie?.spoken_languages
                ?.map((lang) => lang.english_name)
                .join(" | ")}
            </p>
          </div>
          <div>
            {companyPoster && (
              <img
                src={`http://image.tmdb.org/t/p/w500${companyPoster}`}
                height={"75px"}
                width={"300px"}
                alt=""
              />
            )}
          </div>
        </div>
      </div>

      <hr className="mt-1 mb-5" />
    </div>
  );
}
