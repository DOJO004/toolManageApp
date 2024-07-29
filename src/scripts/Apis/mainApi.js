// get user info
export const getUserToken = () => {
  if (typeof document !== "undefined") {
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
    const userTokenCookie = cookies.find((cookie) =>
      cookie.startsWith("userToken=")
    );
    const userToken = userTokenCookie.split("=")[1];
    return userToken;
  }
  return "nLxVDJ2R";
};

export const getLoginTime = () => {
  if (typeof document !== "undefined") {
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
    const userLoginTime = cookies.find((cookie) =>
      cookie.startsWith("loginTime=")
    );
    const loginTime = userLoginTime.split("=")[1];
    return loginTime;
  }
  return "2024-05-17 09:11:22";
};

export const getPermission = () => {
  if (typeof document !== "undefined") {
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
    const userPermission = cookies.find((cookie) =>
      cookie.startsWith("permission=")
    );
    const permission = userPermission?.split("=")[1];
    return permission;
  }
  return "SuperAdmin";
};

export const setCookie = async (name, value, days) => {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};
