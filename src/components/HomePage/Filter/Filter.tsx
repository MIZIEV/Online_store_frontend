import { useEffect, useState } from "react";
import classes from "./Filter.module.scss";
import Button from "../../../UI/Button/Button";
import { getMethod } from "../../../utils/http";

const Filter: React.FC<{ onFilterChange: (filter: string) => void }> = ({
  onFilterChange,
}) => {
  const [sortFilter, setSortFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const handleFilterChange = () => {
    const filters =
      "?sort=" + sortFilter + "&" + "categoryid=" + selectedCategory;
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

  console.log(categories);

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
