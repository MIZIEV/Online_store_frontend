import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { getMethod, postProduct, queryClient } from "../../../utils/http";

import Modal from "../../../UI/Modal/Modal";
import Input from "../../../UI/Input/Input";
import TextArea from "../../../UI/TextArea/TextArea";
import Button from "../../../UI/Button/Button";
import { useEffect, useState } from "react";
import { Category } from "../../../shared.types";

const AddNewModal = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function getCategories() {
      const methods = await getMethod(
        "http://13.60.5.92:8080/api/category/list"
      );
      setCategories(methods);
    }
    getCategories();
  }, []);

  console.log(categories);

  const { mutate, isPending, isError } = useMutation({
    mutationFn: postProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate("/admin");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    mutate(data);

    console.log(data);
  };

  return (
    <Modal onClose={() => navigate("../")}>
      <h1>Add new product</h1>
      {isPending && <p>Sending data to the server... Please wait!</p>}
      {isError && <p>Could not send data to the server. Try again later!</p>}
      <form onSubmit={handleSubmit}>
        <Input id="brand" label="Brand" type="text" />
        <Input id="model" label="Model" type="text" />
        <p>Category</p>
        <select name="categoryId">
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.categoryName}
            </option>
          ))}
        </select>
        <TextArea id="description" label="Description" />
        <Input id="pictureURL" label="Picture URL" type="text" />
        <Input id="price" label="Price" type="number" />
        <div>
          <button disabled={isPending}>Ok</button>
          <Button onClick={() => navigate("../")}>Cancel</Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddNewModal;
