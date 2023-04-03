import { useAppSelector } from "../app/hooks";

import "../App.css";

import GamePreview from "../Components/GamePreview";

const GamesView = () => {
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
    <div>
      {gameListObj.value.results && displayFilteredGameList(gameListArr)}
    </div>
  );
};

export default GamesView;
