import { type } from "os";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectGame, getGameListAsync } from "../features/games/gameSlice";
import {
  incrementPageNumber,
  decrementPageNumber,
} from "../features/games/urlSlice";

const PageSelector = () => {
  const gameListState = useAppSelector((state) => state.game);

  const dispatch = useAppDispatch();

  const urlState = useAppSelector((state) => state.url);

  const getNextPage = () => {
    const pageNumber = urlState.page + 1;

    dispatch(getGameListAsync(`${urlState.url}&page=${pageNumber}`));

    dispatch(incrementPageNumber());
  };

  const getPreviousPage = () => {
    const pageNumber = urlState.page - 1;

    dispatch(getGameListAsync(`${urlState.url}&page=${pageNumber}`));

    dispatch(decrementPageNumber());
  };

  return (
    <div className="home__pageBtn">
      {gameListState.value.previous && (
        <button
          className="home__pageBtn__btn"
          onClick={() => getPreviousPage()}
        >
          {"< Previous"}
        </button>
      )}
      <button className="home__pageBtn__btn" onClick={() => getNextPage()}>
        {"Next >"}
      </button>
    </div>
  );
};

export default PageSelector;
