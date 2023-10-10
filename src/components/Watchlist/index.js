import { useDispatch, useSelector } from "react-redux";
import Rating from "@mui/material/Rating";
import { Favorite } from "@mui/icons-material";
import { addRemoveFavorite } from "../../store/slices/favorite";
import { blue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import image1 from "./1.png";
export default function WatchList() {
  const favoriteArray = useSelector((state) => state.favoriteArray);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="container mb-5">
      {favoriteArray.length === 0 ? (
        <div className="mt-5">
          <h1>Your WatchList Is Empty</h1>
          <img src={image1} alt="..." />
        </div>
      ) : (
        <>
          <h1 className="text-start fw-bold pt-5">Watchlist</h1>
          <div className="row row-cols-1 row-cols-xl-2 g-4">
            {favoriteArray.map((movie) => {
              let truncatedOverview;
              if (movie.overview.length > 200) {
                truncatedOverview = movie.overview.substring(0, 200);
                truncatedOverview =
                  truncatedOverview.substring(
                    0,
                    truncatedOverview.lastIndexOf(" ")
                  ) + "...";
              } else {
                truncatedOverview = movie.overview;
              }
              return (
                <div
                  className="col "
                  onClick={() => navigate(`/movie-detail/${movie.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card h-100 shadow-lg text-start border-top-0">
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                          className=" rounded"
                          alt=""
                          height={"300px"}
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body ">
                          <div className="d-flex flex-row align-items-center justify-content-between">
                            <h3 className="card-title ">{movie.title} </h3>
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                dispatch(addRemoveFavorite(movie));
                              }}
                            >
                              <Favorite
                                fontSize="large"
                                sx={{ color: blue[700] }}
                                style={{ cursor: "pointer" }}
                              />
                            </div>
                          </div>
                          <p className="card-text">
                            <small className="text-muted">
                              {movie.release_date}
                            </small>
                          </p>
                          <div className="rating my-3 d-flex flex-row align-items-center">
                            <h6 className="me-2">
                              {movie.vote_average && (
                                <Rating
                                  name="customized-10"
                                  defaultValue={movie.vote_average}
                                  max={10}
                                  precision={0.5}
                                  readOnly
                                  size="small"
                                />
                              )}
                            </h6>{" "}
                            <h6>{movie.vote_count}</h6>
                          </div>
                          <p className="card-text">{truncatedOverview}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
