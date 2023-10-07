import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Home from "./components/Home";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import WatchList from "./components/Watchlist";
import Search from "./components/Search";
import MovieDetail from "./components/MovieDetail";
import NotFound from "./components/NotFound";
import { ThemeContext } from "./context/theme";
import { useContext, useState } from "react";
function App() {
  const [contextTheme, setContextTheme] = useState("light");
  return (
    <div className="App">
      <BrowserRouter>
        
        <Header />
        <ThemeContext.Provider value={{ contextTheme, setContextTheme }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie-detail/:id" element={<MovieDetail />} />
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/search/:title" element={<Search />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        </ThemeContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
