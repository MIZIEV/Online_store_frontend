import axios from "axios";

const HOST = "13.60.76.209:8080"
const GET_ONE_PHONE_URL = "http://" + HOST + "/api/phone/";
const ADD_NEW_PHONE_URL: string = "http://" + HOST + "/api/phone/add";
const GET_ALL_PHONES_URL = "http://" + HOST + "/api/phone/list";
const UPDATE_PHONE_URL = "http://" + HOST + "/api/phone/";
const GET_ALL_PHONE_DISTINCT_CHARACTERISTICS_URL = "http://" + HOST + "/api/phone/distinct-characteristics";
const WISH_LIST_URL = "http://" + HOST + "/api/phone/"

export async function postProduct(data: unknown) {
  console.log(data);
  try {
    const response = await axios.post(ADD_NEW_PHONE_URL, data);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export async function getOnePhone(phoneId: number) {
  try {
    const response = await axios.get(GET_ONE_PHONE_URL + `${phoneId}`);

    console.log("service function - ")
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export async function updatePhone(phoneId: number, data: any) {

  try {
    const response = await axios.put(UPDATE_PHONE_URL + `${phoneId}`, data);
    console.log("service function - ")
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export async function getPhoneList() {
  try {
    const response = await axios.get(GET_ALL_PHONES_URL);
    console.log("service function GET ALL PHONES - ")
    console.log(response.data)
    return response.data;

  } catch (error) {
    console.error(error);
    throw error;
  }
};

export async function putTheMark(phoneId: number, rating: number) {

  try {
    const response = await axios.patch(GET_ONE_PHONE_URL + `${phoneId}`, { rating });
    console.log("service function PUT THE MARK - ")
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export async function hasUserRatedPhone(phoneId: string, email: string): Promise<boolean> {
  try {
    const response = await axios.get(`${GET_ONE_PHONE_URL}${phoneId}/${email}/hasRated`)
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAllPhoneDistinctCharacteristics() {
  try {
    const response = await axios.get(GET_ALL_PHONE_DISTINCT_CHARACTERISTICS_URL);
    console.log("service function getAllPhoneDistinctCharacteristics - ")
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export async function addPhoneToWishList(phoneId: number, email: string) {
  try {
    const response = await axios.patch(`${WISH_LIST_URL}${phoneId}/wishList/${email}/add`);
    console.log("ADD TO WISH LIST FUNCTION")
    console.log(response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deletePhoneFromWishList(phoneId: number, email: string) {
  try {
    const response = await axios.delete(`${WISH_LIST_URL}${phoneId}/wishList/${email}/remove`);
    console.log("DELETE FROM WISH LIST FUNCTION")
    console.log(response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
}