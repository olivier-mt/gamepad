import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectGame, getGameListAsync } from "../features/games/gameSlice";
import {
  sendNewUrl,
  modifyPageNumByAmount,
  modifySearch,
} from "../features/games/urlSlice";

import "../App.css";

const Search = () => {
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

  return (
    <div>
      <p>Search</p>
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
    </div>
  );
};

export default Search;
