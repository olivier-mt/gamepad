import Select from "react-select";
import { useAppDispatch } from "../app/hooks";
import { modifyExtraFilter } from "../features/games/filterSlice";

const ExtraFilter = () => {
  //"name" | "released" | "rating" | "none"

  const dispatch = useAppDispatch();

  const options = [
    { value: "name", label: "name" },
    { value: "released", label: "release date" },
    { value: "rating", label: "rating" },
  ];

  return (
    <div>
      <Select
        options={options}
        placeholder="filter by:"
        onChange={(obj: any) => dispatch(modifyExtraFilter(obj.value))}
      />
    </div>
  );
};

export default ExtraFilter;
