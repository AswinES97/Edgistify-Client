export const getToken = () => {
  const token = localStorage.getItem("token");
  return !!token;
};
export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};
export const removeToken = (tokenName: string) => {
  localStorage.removeItem(tokenName);
};
