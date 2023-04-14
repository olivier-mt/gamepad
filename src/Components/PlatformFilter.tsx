import AsyncSelect from "react-select/async";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { modifyPlateformFilter } from "../features/games/filterSlice";
import { SingleValue, ActionMeta } from "react-select";

const PlatformFilter = () => {
  type Platform = {
    name: string;
  };

  const dispatch = useAppDispatch();

  const getAllPlatform = async () => {
    try {
      const dataResponse = await axios.get(
        "https://api.rawg.io/api/platforms?key=01597bfbfa2f4a2b81104848a7098dfe"
      );

      const responseTab = dataResponse.data.results;

      const newTab = responseTab.map((obj: Platform) => {
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
        loadOptions={getAllPlatform}
        // onChange={(obj: {value: string}) => dispatch(modifyPlateformFilter(obj.value))}
        onChange={(
          newValue: SingleValue<{ value: string }>,
          actionMeta: ActionMeta<{ value: string }>
        ) => {
          if (newValue !== null) {
            const newValueString = newValue.value;
            dispatch(modifyPlateformFilter(newValueString));
          }
        }}
        placeholder="Select a platform"
      />
    </div>
  );
};

export default PlatformFilter;
