import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

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
      "http://13.60.5.92:8080/api/product/add",
      data
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
