import axios from "axios";
import { QueryClient } from "@tanstack/react-query";
import { getToken } from "./AuthService";
import { HOST } from "./host";
import api from "./api";

export const queryClient = new QueryClient();

const HOST_PORT = HOST;

const PRODUCTS_URL = "http://" + HOST_PORT + "/api/phone/list";
const ADD_NEW_PHONE_URL: string = "http://" + HOST_PORT + "/api/phone/add";
const DELETE_PRODUCT_URL: string = "http://" + HOST_PORT + "/api/phone/remove/";


//this function add new header (Authorization) with jwt, backend can recognize authorization
axios.interceptors.request.use(function (config) {
  config.headers['Authorization'] = getToken();
  return config;
}, function (error) {
  return Promise.reject(error);
});

export async function getMethod(path: string) {
  try {
    const response = await api.get(path);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function getProducts({
  signal,
  filter,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signal: any;
  filter: string;
}) {
  let url = PRODUCTS_URL;

  if (filter) {
    url += filter;
  }

  console.log(url);

  try {
    const response = await api.get(url, { cancelToken: signal.token });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function postProduct(data: unknown) {
  console.log(data);
  try {
    const response = await api.post(ADD_NEW_PHONE_URL, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteProduct(productId: number) {
  try {
    const response = await api.delete(DELETE_PRODUCT_URL + `${productId}`);

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

  try {
    const response = await api.put(
      PRODUCTS_URL + `${productInfo.productId}`,
      productInfo.productData
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}