import { IUser } from "@/interfaces/user.interface";
import axios from "axios";

function store(user: IUser) {
  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users`, user);
}

function update(user: IUser) {
  return axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`, user);
}

const UsersAPI = {
  store,
  update,
};

export default UsersAPI;
