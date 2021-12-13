import axios from "axios";

export default axios.create({
  baseURL: "https://crmbackendapi-dev.ap-south-1.elasticbeanstalk.com/api",
});
