import axios from "axios";
const API_URL = "http://localhost/api/";

const getUserBoard = () => {
  return axios.get(API_URL + "users");
};

const UserService = {
  getUserBoard,
}
export default UserService;
