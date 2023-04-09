import { useAppSelector } from "../app/hooks";

import "../App.css";

import DisplayFilteredGameList from "../Functions/DisplayFilteredGameList";

const GamesView = () => {
  const gameListObj = useAppSelector((state) => state.game);

  return (
    <div className="home__gameView">
      {gameListObj.value.results && DisplayFilteredGameList(gameListObj)}
    </div>
  );
};

export default GamesView;
