import { useEffect, useState } from "react";
import Input from "../../../UI/Input/Input";
import { CardProps, Category } from "../../../shared.types";
import { getMethod } from "../../../utils/http";
import TextArea from "../../../UI/TextArea/TextArea";
import Button from "../../../UI/Button/Button";
import { useNavigate } from "react-router-dom";

const ProductForm: React.FC<{
  isPending: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  product?: Partial<CardProps>;
}> = (props) => {
  console.log(props.product);
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);

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
    <form onSubmit={props.handleSubmit}>
      <Input
        id="brand"
        label="Brand"
        type="text"
        value={props.product ? props.product.brand : undefined}
      />
      <Input
        id="model"
        label="Model"
        type="text"
        value={props.product ? props.product.model : undefined}
      />
      <p>Category</p>
      <select name="categoryId">
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.categoryName}
          </option>
        ))}
      </select>
      <TextArea
        id="description"
        label="Description"
        value={props.product ? props.product.model : undefined}
      />
      <Input
        id="pictureURL"
        label="Picture URL"
        type="text"
        value={props.product ? props.product.pictureURL : undefined}
      />
      <Input
        id="price"
        label="Price"
        type="number"
        min="0"
        step="1.0"
        value={props.product ? props.product.price : undefined}
      />
      <div>
        <button disabled={props.isPending}>Ok</button>
        <Button onClick={() => navigate("../")}>Cancel</Button>
      </div>
    </form>
  );
};

export default ProductForm;
