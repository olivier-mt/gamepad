import PlatformFilter from "./PlatformFilter";
import GenreFilter from "./GenreFilter";
import ExtraFilter from "./ExtraFilter";

const FilterBar = () => {
  return (
    <div>
      <PlatformFilter />
      <GenreFilter />
      <ExtraFilter />
    </div>
  );
};

export default FilterBar;
