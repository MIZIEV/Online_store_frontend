import classes from "./Filter.module.scss";

const Filter = () => {
  return (
    <div className={classes.filter}>
      <div>
        <p>Category</p>
        <select name="category">
          <option key="case" value="case">
            case
          </option>
          <option key="phone" value="phone">
            phone
          </option>
        </select>
      </div>
      <div>
        <p>Price</p>
        <select name="category">
          <option key="expensive" value="expensive">
            More expensive at first
          </option>
          <option key="cheaper" value="cheaper">
            Cheaper at first
          </option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
