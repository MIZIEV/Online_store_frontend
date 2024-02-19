import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postProduct, queryClient } from "../../../utils/http";

import Modal from "../../../UI/Modal/Modal";
import ProductForm from "./ProductForm";

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
  };

  return (
    <Modal onClose={() => navigate("../")}>
      <h1>Add new product</h1>
      {isPending && <p>Sending data to the server... Please wait!</p>}
      {isError && <p>Could not send data to the server. Try again later!</p>}
      <ProductForm isPending={isPending} handleSubmit={handleSubmit} />
    </Modal>
  );
};

export default AddNewModal;
