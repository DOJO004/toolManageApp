// get user info
export const getUserToken = () => {
  const cookies = document.cookie.split(";");
  return cookies[0]?.split("=")[1];
};

export const getLoginTime = () => {
  const cookies = document.cookie.split(";");
  return cookies[1]?.split("=")[1];
};
