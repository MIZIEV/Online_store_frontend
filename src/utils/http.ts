import axios from "axios";

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
