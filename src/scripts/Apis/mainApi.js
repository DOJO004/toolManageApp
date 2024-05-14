// get user info
export const getUserToken = () => {
  const cookies = document.cookie.split(";").map(cookie => cookie.trim());
  const userTokenCookie = cookies.find(cookie => cookie.startsWith("userToken="));
  console.log("user token = ", userTokenCookie);
  
  if (userTokenCookie) {
    return userTokenCookie.split("=")[1];
  }
  
  return null; // 如果找不到 userToken，返回 null
};


export const getLoginTime = () => {
  const cookies = document.cookie.split(";").map(cookie => cookie.trim());
  const userLoginTime = cookies.find(cookie => cookie.startsWith("loginTime="));
  
  if (userLoginTime) {
    return userLoginTime.split("=")[1];
  }
  
  return null; // 如果找不到 userToken，返回 null
};

export const getPermission = () => {
  const cookies = document.cookie.split(";").map(cookie => cookie.trim());
  const userPermission = cookies.find(cookie => cookie.startsWith("permission="));
  
  if (userPermission) {
    return userPermission.split("=")[1];
  }
  
  return null; // 如果找不到 userToken，返回 null
}

export const setCookie = async (name, value, days) => {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};
