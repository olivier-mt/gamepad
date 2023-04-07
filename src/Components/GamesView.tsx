import { useAppSelector } from "../app/hooks";

import "../App.css";

import GamePreview from "../Components/GamePreview";

const GamesView = () => {
  const gameListObj = useAppSelector((state) => state.game);
  const gameListArr = gameListObj.value.results;

  const plateformFilter = useAppSelector(
    (state) => state.filter.platformFilter
  );

  const genreFilter = useAppSelector((state) => state.filter.genreFilter);

  const extraFilters = useAppSelector((state) => state.filter.extraFilters);

  const displayFilteredGameList = (gameListArr: any) => {
    // if(plateformFilter === "" && typeFilter == "" && !nameFilter && !dateFilter    ){}

    let finalArr: {
      name: string;
      genres: { name: string }[];
      released: string;
      rating: string;
      id: string;
      background_image: string;
    }[] = [];
    /*---- PLATFORM FILTER  ----*/

    if (plateformFilter === "") {
      //return gameListObj.value.results
      finalArr = [...gameListObj.value.results];
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
      <GamePreview name={obj.name} img={obj.background_image} key={obj.id} />
    ));
  };

  return (
    <div className="home__gameView">
      {gameListObj.value.results && displayFilteredGameList(gameListArr)}
    </div>
  );
};

export default GamesView;
