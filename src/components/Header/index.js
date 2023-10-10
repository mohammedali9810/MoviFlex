import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import {faTicket} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/theme";
import { LanguageContext } from "../../context/language";


export default function Header() {
  const favoriteArray = useSelector((state) => state.favoriteArray);
  //const {contextTheme, setContextTheme} = useContext(ThemeContext);
  const { setContextLang } = useContext(LanguageContext);
  const { setContextTheme } = useContext(ThemeContext);
  return (
    <>
      <nav className="navbar sticky-top  nav-dark bg-primary  ">
        <div className="container-fluid ">
          
          <Link to="/" className=" align-items-center navbar-brand fw-bold">
            <FontAwesomeIcon icon={faTicket} size="lg" />
            &nbsp;&nbsp;MoviFlex
          </Link>
          <div>
          
            <button
              className="btn bg-info me-2 fw-bold"
              onClick={() => setContextTheme("Dark")}
            >
              Dark Theme
            </button>
            <button
              className="btn bg-info me-2 fw-bold"
              onClick={() => setContextTheme("light")}
            >
              Light Theme
            </button>
            <button
              className="btn  me-2 fw-bold  btn btn-outline-dark"
              onClick={() => setContextLang("en")}
            >
              EN
            </button>
            <button
              className="btn btn btn-outline-dark me-2 fw-bold"
              onClick={() => setContextLang("ar")}
            >
              ع
            </button>
            <Link
              to="/new-user"
              className="me-3 fw-bold text-decoration-none text-dark "
            >
              Register
            </Link>
            
          </div>
          <Link
            className="d-flex  align-items-center text-decoration-none text-dark me-2 "
            to={"/watchlist"}
          >
           <FontAwesomeIcon className="me-2" icon={faHeart} size="lg" />
            <div className="fw-bold position-relative p-1">
              {" "}
              WatchList
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-dark">
                {favoriteArray.length}
              </span>{" "}
            </div>
          </Link>
        </div>
      </nav>
    </>
  );
}
