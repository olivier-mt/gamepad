import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
//import { Counter } from "./features/counter/Counter";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectGame, getGameListAsync } from "../features/games/gameSlice";
import {
  incrementPageNumber,
  decrementPageNumber,
  sendNewUrl,
  modifyPageNumByAmount,
  modifySearch,
} from "../features/games/urlSlice";

import "../App.css";
import { getMaxListeners } from "process";
import Header from "../Components/Header";
import GamePreview from "../Components/GamePreview";
import PageSelector from "../Components/PageSelector";
import FilterBar from "../Components/FilterBar";

const Home = () => {
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState<string>("");

  const urlState = useAppSelector((state) => state.url);

  useEffect(() => {
    dispatch(getGameListAsync(urlState.url));
  }, []);

  const makeNewSearch = () => {
    dispatch(
      getGameListAsync(
        `https://api.rawg.io/api/games?key=01597bfbfa2f4a2b81104848a7098dfe&search=${search}`
      )
    );
    dispatch(
      sendNewUrl(
        `https://api.rawg.io/api/games?key=01597bfbfa2f4a2b81104848a7098dfe&search=${search}`
      )
    );
    dispatch(modifyPageNumByAmount(1));
    dispatch(modifySearch(search));
  };

  const gameListObj = useAppSelector((state) => state.game);
  const gameListArr = gameListObj.value.results;

  const plateformFilter = useAppSelector(
    (state) => state.filter.platformFilter
  );

  const typeFilter = useAppSelector((state) => state.filter.type);

  const extraFilters = useAppSelector((state) => state.filter.extraFilters);

  // console.log("plateformFilter", plateformFilterArr);

  const displayFilteredGameList = (gameListArr: any) => {
    // if(plateformFilter === "" && typeFilter == "" && !nameFilter && !dateFilter    ){}

    let finalArr: {
      name: string;
      genres: { name: string }[];
      released: string;
      rating: string;
      id: string;
    }[] = [];
    /*---- PLATFORM FILTER  ----*/

    if (plateformFilter === "") {
      //return gameListObj.value.results
      finalArr = [...gameListObj.value.results];
      console.log("All", gameListObj.value.results);
      console.log("finalArr", finalArr);
    } else {
      // const newArr: { name: string }[] = [];

      gameListArr.forEach((obj: any) => {
        obj.platforms.forEach((platformObj: any) => {
          if (platformObj.platform.name === plateformFilter) {
            // newArr.push(obj);

            finalArr.push(obj);
          }
        });
      });

      console.log("Filtered finalArr", finalArr);
    }

    /*-----------------------------------*/

    /*----------- TYPE FILTER  -----------*/

    if (typeFilter) {
      let newArr: any[] = [];

      finalArr.forEach((obj) => {
        obj.genres.forEach((elem) => {
          if (elem.name == typeFilter) {
            newArr.push(obj);
          }
        });
      });

      finalArr = [...newArr];

      console.log("type filtered finalArr", finalArr);
    } else {
      console.log("no type filter");
    }

    /*------------ NAME / RELEASE DATE / AVERAGE RANKING FILTER  ---------------*/

    if (extraFilters === "name") {
      let newArr = [...finalArr];

      newArr.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });

      finalArr = [...newArr];
    } else if (extraFilters === "released") {
      let newArr = [...finalArr];

      newArr.sort(function (a, b) {
        if (a.released < b.released) {
          return 1;
        }
        if (a.released > b.released) {
          return -1;
        }
        return 0;
      });

      finalArr = [...newArr];
    } else if (extraFilters === "rating") {
      let newArr = [...finalArr];

      console.log("before rating sorting", finalArr);

      newArr.sort(function (a, b) {
        if (a.rating < b.rating) {
          return 1;
        }
        if (a.rating > b.rating) {
          return -1;
        }
        return 0;
      });

      finalArr = [...newArr];

      console.log("after rating sorting", finalArr);
    }

    /*-----------------------------------------*/

    return finalArr.map((obj) => <GamePreview name={obj.name} key={obj.id} />);
  };

  return (
    <div className="App">
      <Header />
      <p>Home</p>
      <form>
        <input
          type="text"
          name="searchInput"
          placeholder="Search for a game"
          onChange={(e) => {
            setSearch(e.currentTarget.value);
          }}
        />
        <input type="button" value="search" onClick={() => makeNewSearch()} />
      </form>

      <FilterBar />
      <p>{urlState.search && `Search results for "${urlState.search}"`}</p>
      <p> {gameListObj.value.count && `${gameListObj.value.count} games`} </p>
      <div>
        <p>Game list</p>
        <div>
          {/*gameListObj.value.results &&
            gameListObj.value.results.map(
              (obj: { name: string; id: number }) => (
                <GamePreview name={obj.name} key={obj.id} />
              )
            )*/}
        </div>
        <div>
          {gameListObj.value.results && displayFilteredGameList(gameListArr)}
        </div>
        <PageSelector />
      </div>
    </div>
  );
};

export default Home;
