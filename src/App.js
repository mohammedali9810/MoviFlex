import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Home from "./components/Home";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import WatchList from "./components/Watchlist";
import Search from "./components/Search";
import MovieDetail from "./components/MovieDetail";
import NotFound from "./components/NotFound";
import NewUser from "./components/NewUser";
import { ThemeContext } from "./context/theme";
import { useContext, useState } from "react";
import { LanguageContext } from "./context/language";

function App() {
  const [contextTheme, setContextTheme] = useState("light");
  const [contextLang, setContextLang] = useState("en");
  return (
    <div className={contextTheme == "light" ? "App" : "App bg-dark text-white"}>
      <BrowserRouter>
        <ThemeContext.Provider value={{ contextTheme, setContextTheme }}>
          <LanguageContext.Provider value={{ contextLang, setContextLang }}>
          <Header />
            <div
              className="container"
              // eslint-disable-next-line eqeqeq
              dir={contextLang == "en" ? "ltr" : "rtl"}
            >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/MoviFlex" element={<Home />} />
          <Route path="/movie-detail/:id" element={<MovieDetail />} />
          <Route path="/new-User" element={<NewUser />} />
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/search/:title" element={<Search />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
          </div>
          </LanguageContext.Provider>
        </ThemeContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;

