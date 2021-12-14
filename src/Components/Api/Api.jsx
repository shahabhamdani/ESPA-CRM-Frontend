import axios from "axios";

export default axios.create({
  baseURL: "http://crmbackendapi-dev.ap-south-1.elasticbeanstalk.com/api",
});
