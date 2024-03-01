import { useState } from "react";
import classes from "./Filter.module.scss";
import Button from "../../../UI/Button/Button";

const Filter: React.FC<{ onFilterChange: (filter: string) => void }> = ({
  onFilterChange,
}) => {
  const [sortFilter, setSortFilter] = useState("");

  const handleFilterChange = () => {
    const filters = "?sort=" + sortFilter;
    onFilterChange(filters);
  };

  return (
    <div className={classes.filter}>
      <div>
        <p>Category</p>
        <select name="category">
          <option key="not-selected" value="">
            Not selected
          </option>
          <option key="case" value="case">
            Cases
          </option>
          <option key="phone" value="phone">
            Phones
          </option>
        </select>
      </div>
      <div>
        <p>Price</p>
        <select
          name="category"
          onChange={(event) => {
            setSortFilter(event.target.value);
          }}
        >
          <option key="recomended" value="">
            Recomended
          </option>
          <option key="expensive" value="max">
            More expensive at first
          </option>
          <option key="cheaper" value="min">
            Cheaper at first
          </option>
        </select>
      </div>
      <Button onClick={handleFilterChange}>Apply</Button>
    </div>
  );
};

export default Filter;
