import AsyncSelect from "react-select/async";
import axios from "axios";
import { useAppDispatch } from "../app/hooks";
import { modifyGenreFilter } from "../features/games/filterSlice";

const GenreFilter = () => {
  type Genre = {
    name: string;
  };

  const dispatch = useAppDispatch();

  const getAllGenre = async () => {
    try {
      const dataResponse = await axios.get(
        "https://api.rawg.io/api/genres?key=01597bfbfa2f4a2b81104848a7098dfe"
      );

      const responseTab = dataResponse.data.results;

      const newTab = responseTab.map((obj: Genre) => {
        return {
          value: obj.name,
          label: obj.name,
        };
      });

      return newTab;
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <AsyncSelect
        cacheOptions
        defaultOptions
        loadOptions={getAllGenre}
        onChange={(obj: any) => dispatch(modifyGenreFilter(obj.value))}
        placeholder="Genre"
      />
    </div>
  );
};

export default GenreFilter;
