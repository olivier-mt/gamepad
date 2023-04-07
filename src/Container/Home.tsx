import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectGame, getGameListAsync } from "../features/games/gameSlice";
import "../Sass/_home.scss";
//import "../App.css";
import Header from "../Components/Header";
import Search from "../Components/Search";
import GamesView from "../Components/GamesView";
import PageSelector from "../Components/PageSelector";
import FilterBar from "../Components/FilterBar";

const Home = () => {
  const dispatch = useAppDispatch();

  const urlState = useAppSelector((state) => state.url);

  useEffect(() => {
    dispatch(getGameListAsync(urlState.url));
  }, []);

  const gameListObj = useAppSelector((state) => state.game);

  return (
    <div>
      <Header />

      <div className="home">
        <p className="home__title">Gamepad</p>
        <Search />

        <FilterBar />
        <p className="home__gameSearch">
          {urlState.search && `Search results for "${urlState.search}"`}
        </p>
        <p className="home__gameNumb">
          {gameListObj.value.count && `${gameListObj.value.count} games`}
        </p>
        <div>
          <GamesView />
          <PageSelector />
        </div>
      </div>
    </div>
  );
};

export default Home;
