import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

const PRODUCTS_URL = "http://13.60.5.92:8080/api/product/";
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
    const response = await axios.post(ADD_NEW_PRODUCT_URL, data);
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

export async function editProduct(productInfo: {
  productId: string | undefined;
  productData: unknown;
}) {
  console.log(productInfo.productId);
  console.log(productInfo.productData);
  try {
    const response = await axios.put(
      PRODUCTS_URL + `${productInfo.productId}`,
      productInfo.productData
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
