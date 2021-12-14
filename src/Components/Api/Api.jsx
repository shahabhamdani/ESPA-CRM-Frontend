import axios from "axios";

export default axios.create({
  baseURL: "http://db.crm.espabuilders.com/api",
});
