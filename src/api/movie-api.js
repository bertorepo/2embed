import axios from "axios"
import { MAIN_URL } from "./constants"


export const getAllMovies = async() => {
  const results = await axios.get(`${MAIN_URL}/movies`, {
    headers: {
      "Content-Type":"application/json"
    }
  })

  return results;
}

export const filterDataByType = async(type) => {
  const response = await axios.get(`${MAIN_URL}/movies`, {
     headers: {
      "Content-Type":"application/json"
    }
  })

  return response.data.filter(resp =>  resp.Type === type);
}