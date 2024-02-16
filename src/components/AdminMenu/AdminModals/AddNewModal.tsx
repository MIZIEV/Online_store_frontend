import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postProduct, queryClient } from "../../../utils/http";

import Modal from "../../../UI/Modal/Modal";
import Input from "../../../UI/Input/Input";
import TextArea from "../../../UI/TextArea/TextArea";
import Button from "../../../UI/Button/Button";

const AddNewModal = () => {
  const navigate = useNavigate();

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
