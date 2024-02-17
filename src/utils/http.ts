import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

const ADD_NEW_PRODUCT_URL: string = "http://13.60.5.92:8080/api/product/add";
const DELETE_PRODUCT_URL: string = "http://13.60.5.92:8080/api/product/remove/";

export async function getMethod(path: string) {
  try {
    const response = await axios.get(path);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function postProduct(data: unknown) {
  console.log(data);
  try {
    const response = await axios.post(
      ADD_NEW_PRODUCT_URL,
      data
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteProduct(productId: number) {

  try {
    const response = await axios.delete(DELETE_PRODUCT_URL + `${productId}`);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}