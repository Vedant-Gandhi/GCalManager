import axios from "axios";
import Cookies from "js-cookie";
import { DOMAIN_NAME } from "../Config";
import { getToken, setToken } from "../Security/Security";

export function postData(url, data = {}, sucess, failure, headers) {
  const config = {
    headers: { token: getToken() },
  };
  if (headers && !(headers === {}) && typeof headers === "object") {
    config = { ...headers, ...config.headers };
  }

  axios
    .post(url, data, config)
    .then((result) => {
      sucess(result);
    })
    .catch((error) => {
      failure(error);
    });
}

export function getData(url, sucess, failure, headers) {
  const config = {
    headers: { token: getToken() },
  };
  if (headers && !(headers === {}) && typeof headers === "object") {
    config = { ...headers, ...config.headers };
  }

  axios
    .get(url, config)
    .then((result) => {
      result.headers["token"] = null;
      sucess(result);
    })
    .catch((error) => {
      failure(error);
    });
}
export const getTokenfromNetwork = (code, sucess, failure) => {
  postData(
    `${DOMAIN_NAME}generateToken`,
    { code: code },
    (data) => {
      const data_ = data.data;
      setToken(data_.token);
      sucess();
    },
    (err) => {
      failure(err);
    }
  );
};
