// get user info
export const getUserToken = () => {
  const cookies = document.cookie.split(";");
  return cookies[0]?.split("=")[1];
};

export const getLoginTime = () => {
  const cookies = document.cookie.split(";");
  return cookies[1]?.split("=")[1];
};

export const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};
