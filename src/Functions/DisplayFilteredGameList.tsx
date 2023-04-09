import GamePreview from "../Components/GamePreview";
import { useAppSelector } from "../app/hooks";
import { GameInterface } from "../features/games/gameSlice";

const DisplayFilteredGameList = (gameListObj: GameInterface) => {
  const gameListArr = gameListObj.value.results;

  const plateformFilter = useAppSelector(
    (state) => state.filter.platformFilter
  );

  const genreFilter = useAppSelector((state) => state.filter.genreFilter);

  const extraFilters = useAppSelector((state) => state.filter.extraFilters);

  let finalArr: {
    name: string;
    genres: { name: string }[];
    released: string;
    rating: string;
    id: number;
    background_image: string;
  }[] = [];
  /*---- PLATFORM FILTER  ----*/

  if (plateformFilter === "") {
    finalArr = [...gameListObj.value.results];
  } else {
    gameListArr.forEach((obj: any) => {
      obj.platforms.forEach((platformObj: any) => {
        if (platformObj.platform.name === plateformFilter) {
          finalArr.push(obj);
        }
      });
    });
  }

  /*-----------------------------------*/

  /*----------- TYPE FILTER  -----------*/

  if (genreFilter) {
    let newArr: any[] = [];

    finalArr.forEach((obj) => {
      obj.genres.forEach((elem) => {
        if (elem.name == genreFilter) {
          newArr.push(obj);
        }
      });
    });

    finalArr = [...newArr];
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

    console.log("extra Filters name", finalArr);
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

    console.log("extra Filters released", finalArr);
  } else if (extraFilters === "rating") {
    let newArr = [...finalArr];

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

    console.log("extra Filters rating", finalArr);
  }

  /*-----------------------------------------*/

  return finalArr.map((obj) => (
    <GamePreview
      name={obj.name}
      img={obj.background_image}
      key={obj.id}
      id={obj.id}
    />
  ));
};

export default DisplayFilteredGameList;
