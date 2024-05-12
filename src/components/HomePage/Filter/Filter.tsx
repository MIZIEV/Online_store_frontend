import { useEffect, useRef, useState } from "react";
import classes from "./Filter.module.scss";
import Button from "../../../UI/Button/Button";
import { getMethod } from "../../../utils/http";

const Filter: React.FC<{ onFilterChange: (filter: string) => void }> = ({
  onFilterChange,
}) => {
  const [sortFilter, setSortFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const searchTerm = useRef<HTMLInputElement>(null);

  const handleFilterChange = () => {
    const filters =
      "?sort=" +
      sortFilter +
      "&" +
      "categoryid=" +
      selectedCategory +
      "&" +
      "searchTerm=" +
      searchTerm.current?.value;
    onFilterChange(filters);
  };

  useEffect(() => {
    async function getCategories() {
      const returnedCategories = await getMethod(
        "http://13.60.5.92:8080/api/category/list"
      );
      setCategories(returnedCategories);
    }
    getCategories();
  }, []);

  return (
    <div className={classes.filter}>
      <div>
        <p>Category</p>
        <select
          name="category"
          onChange={(event) => {
            setSelectedCategory(event.target.value);
          }}
        >
          <option key="not-selected" value="">
            Not selected
          </option>
          {categories.map((category: { id: number; categoryName: string }) => (
            <option key={category.id} value={category.id}>
              {category.categoryName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p>Sorting</p>
        <select
          name="category"
          onChange={(event) => {
            setSortFilter(event.target.value);
          }}
        >
          <option key="recomended" value="maxRating">
            By rating
          </option>
          <option key="expensive" value="maxPrice">
            By more price
          </option>
          <option key="cheaper" value="minProice">
            By lower price
          </option>
        </select>
      </div>
      <input type="text" ref={searchTerm} onChange={handleFilterChange} />
      <Button onClick={handleFilterChange}>Apply</Button>
    </div>
  );
};

export default Filter;
