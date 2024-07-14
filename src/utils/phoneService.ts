import { HOST } from "./host";
import api from "./api";
import { Phone } from "../shared.types";

const HOST_PORT = HOST;
const GET_ONE_PHONE_URL = "http://" + HOST_PORT + "/api/phone/";
const ADD_NEW_PHONE_URL: string = "http://" + HOST_PORT + "/api/phone/add";
const GET_ALL_PHONES_URL = "http://" + HOST_PORT + "/api/phone/list";
const UPDATE_PHONE_URL = "http://" + HOST_PORT + "/api/phone/";
const GET_ALL_PHONE_DISTINCT_CHARACTERISTICS_URL = "http://" + HOST_PORT + "/api/phone/distinct-characteristics";
const WISH_LIST_URL = "http://" + HOST_PORT + "/api/phone/"

export async function addNewPhone(data: Phone) {
  console.log(data);
  try {
    const response = await api.post(ADD_NEW_PHONE_URL, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export async function getOnePhone(phoneId: number) {
  try {
    const response = await api.get(GET_ONE_PHONE_URL + `${phoneId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export async function updatePhone(phoneId: number, data: any) {

  try {
    const response = await api.put(UPDATE_PHONE_URL + `${phoneId}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export async function getPhoneList() {
  try {
    const response = await api.get(GET_ALL_PHONES_URL);
    return response.data;

  } catch (error) {
    console.error(error);
    throw error;
  }
};

export async function putTheMark(phoneId: number, rating: number) {

  try {
    const response = await api.patch(GET_ONE_PHONE_URL + `${phoneId}`, { rating });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export async function hasUserRatedPhone(phoneId: string, email: string): Promise<boolean> {
  try {
    const response = await api.get(`${GET_ONE_PHONE_URL}${phoneId}/${email}/hasRated`)
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export async function getAllPhoneDistinctCharacteristics() {
  try {
    const response = await api.get(GET_ALL_PHONE_DISTINCT_CHARACTERISTICS_URL);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export async function addPhoneToWishList(phoneId: number, email: string) {
  try {
    const response = await api.patch(`${WISH_LIST_URL}${phoneId}/wishList/${email}/add`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export async function deletePhoneFromWishList(phoneId: number, email: string) {
  try {
    const response = await api.delete(`${WISH_LIST_URL}${phoneId}/wishList/${email}/remove`);
    return response.data;
  } catch (error) {
    throw error;
  }
};