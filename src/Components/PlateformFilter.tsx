import Select from "react-select";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { modifyPlateformFilter } from "../features/games/filterSlice";

const PlateformFilter = () => {
  const options = [
    { value: "", label: "All platform" },
    { value: "PC", label: "PC" },
    { value: "Xbox One", label: "X Box One" },
    { value: "PlayStation 4", label: "PlayStation 4" },
  ];

  const dispatch = useAppDispatch();

  return (
    <div>
      <p>Plateform Filter</p>

      <Select
        options={options}
        placeholder="plateform: All"
        defaultValue={options[0]}
        onChange={(obj: any) => {
          dispatch(modifyPlateformFilter(obj.value));

          console.log("obj", obj);
        }}
      />
    </div>
  );
};

export default PlateformFilter;
