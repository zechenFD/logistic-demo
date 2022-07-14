import axios from "axios";
//creation of Axios Instance
export default axios.create({
  baseURL: `http://localhost:4000/`,
});
