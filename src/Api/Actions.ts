import axios from "axios";
import Iuser from "../Model/IUser";

const api = axios.create({
  baseURL: "https://dummyjson.com",
});

export const GetUsers = async (): Promise<Iuser[]> => {
  var response = await api.get("users");
  return response.data.users;
};

export const CreateUsers = async (data: any) => {
  var response = await api.post("users/add");
  return response.data;
};

export const UpdateUsers = async (data: any, Id: number) => {
  var response = await api.put(`users/${Id}`, data);
  return response.data;
};

export const DeleteUsers = async (Id: number) => {
  var response = await api.delete(`users/${Id}`);
  return response.data;
};
