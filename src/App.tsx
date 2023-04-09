import Home from "./Container/Home";
import GameDetailsPage from "./Container/GameDetailsPage";
import { Routes, Route, useParams } from "react-router-dom";

function App() {
  let { gameId } = useParams();

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="details">
          <Route path=":gameId" element={<GameDetailsPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
