import Cookies from "js-cookie";

export function getToken() {
  return Cookies.get("token");
}
export function checkToken() {
  return !(Cookies.get("token") === undefined);
}
export function deleteToken() {
  Cookies.remove("token");
}
export const setToken = (token) => {
  Cookies.set("token", token);
};
