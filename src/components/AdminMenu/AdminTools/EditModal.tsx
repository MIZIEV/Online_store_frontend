import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../../UI/Modal/Modal";
import ProductForm from "./ProductForm";
import { useEffect, useState } from "react";
import { editProduct, getMethod, queryClient } from "../../../utils/http";
import { useMutation } from "@tanstack/react-query";

const EditModal = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({});

  const { mutate, isPending } = useMutation({
    mutationFn: editProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate("/admin");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    mutate({ productId: params.productId, productData: data });
  };

  useEffect(() => {
    async function getProduct() {
      const returdnedProdcuct = await getMethod(
        "http://13.60.5.92:8080/api/product/" + params.productId
      );
      setProduct(returdnedProdcuct);
    }
    getProduct();
  }, [params.productId]);

  return (
    <Modal onClose={() => navigate("../")}>
      <ProductForm
        product={product}
        handleSubmit={handleSubmit}
        isPending={isPending}
      />
    </Modal>
  );
};

export default EditModal;
