import axios from "axios";

const HOST = "localhost:8090"
const GET_ONE_PHONE_URL = "http://" + HOST + "/api/phone/";
const ADD_NEW_PHONE_URL: string = "http://" + HOST + "/api/phone/add";
const GET_ALL_PHONES_URL = "http://" + HOST + "/api/phone/list";


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
}

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
}