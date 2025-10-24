import axios, {AxiosRequestConfig} from "axios";
import { Item, ItemEntity, ItemResponse } from "../types";

const getAxiosConfig = () : AxiosRequestConfig => {
  const token = sessionStorage.getItem('jwt')?.replace('Bearer ', '');

  return{
    headers : {
      'Authorization' : token,
      'Content-Type' : 'application/json',
    },
  };
}

export const getItems = async () : Promise<ItemResponse[]> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/items`,
    getAxiosConfig()
  );
  console.log(response.data);

  return response.data._embedded.items;
}

export const deleteItem = async (link: string) : Promise<ItemResponse> => {
  const response = await axios.delete(link, getAxiosConfig());

  return response.data;
}

export const addItems = async (item: Item) : Promise<ItemResponse> => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/items`, item, getAxiosConfig());

  return response.data; 
}

export const updateItem = async (itemEntity : ItemEntity) : Promise<ItemResponse> => {
  const response = await axios.put(itemEntity.url, itemEntity.item, getAxiosConfig());
  return response.data;
}