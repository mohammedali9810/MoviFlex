import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClapperboard } from "@fortawesome/free-solid-svg-icons";
import "./search.css";
import { useNavigate } from "react-router-dom";
export default function Search() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleSearch = () => {
    if (query.trim() !== "") {
      navigate(`/search/${query}`); // Use navigate to redirect
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };
  return (
    <div className="search p-4 text-start my-3 mx-4 rounded shadow center-content">
  <h2 className="text-start d-flex align-items-center">
    <FontAwesomeIcon  icon={faClapperboard} size="lg" />
    &nbsp;&nbsp;Welcome to MoviFlex !!
  </h2>
  <div className="container my-3 mx-4">
    <h6 className="center-content">
      Explore every genre You like.
    </h6>

    <div className="row align-items-center mt-4">
    <div className="col-md-8 col-lg-10 col-sm-6 search-input">
    <input
      type="text"
      className="form-control shadow fs-4 h-100"
      placeholder="Search and Explore"
      value={query}
      onChange={handleInputChange}
    />
  </div>
  <div className="col">
    <button
      onClick={handleSearch}
      className="btn btn-primary fs-4 p-2 shadow  h-100"
    >
      Search
    </button>
  </div>
 </div>

  </div>
</div>
  
  );
}
