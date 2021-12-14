import axios from "axios";

export default axios.create({
  baseURL: "//crmbackendapi-dev.ap-south-1.elasticbeanstalk.com/api",
});
