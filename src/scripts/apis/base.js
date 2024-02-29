import axios from "axios";
export const apiInstance = axios.create({
baseURL:"http://10.45.34.81:8082",
timeout:5000,
headers:{
    "accept": "application/json",
    "Content-Type": "application/json",
}
})

export const apiInstance2 = axios.create({
baseURL:"http://10.45.34.81:8083",
timeout:5000,
headers:{
    "accept": "application/json",
    "Content-Type": "application/json",
}
})


// get user info
export const getUserToken = ()=>{
    const cookies = document.cookie.split(";")
    return cookies[0]?.split("=")[1]
}

export const getLoginTime = ()=>{
    const cookies = document.cookie.split(";")
    return cookies[1]?.split("=")[1]
}

export const responsesReqInt = (reqInt)=>{
    switch (reqInt){
        case 0 :
            return "success!"
        case -10:
            return "id can't be repeated."
        default:
            return "something error, please check input value."
    }
    
}

// accountInfo
export const apiUserLogin = async (account,password) =>{
    try{
     const res = await apiInstance.post("/account_info/UserLogin",{
            "UserAccount" : account,
                "UserPwd" : password
        });
    return res
    } 
    catch(error){
        console.error("Error", error);
    }
};

// getUserAccountInfoList
export const apiGetUserAccountInfoList = async()=>{
    const body = {
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
            "Tag2Tool_R",
            "Tag2Tool_W"
        ],
        "RecordsPerPage": 99,
        "PageNo": 1
    }
    try{
        const res = await apiInstance.post("account_info/GetUserAccountInfoList", body)
        return res
    }
    catch(error){
        console.error("Error",error);
        return error
    }
}

// addUserAccountInfo
export const apiAddUserAccountInfo = async (userInfo) => {
  const body = {
    "UserToken": getUserToken(),
    "LoginTime": getLoginTime(),
    "NeedPermissions": [
      "Tag2Tool_R",
      "Tag2Tool_W"
    ],
    DepartmentID: userInfo.DepartmentID,
    UserAccount: userInfo.UserAccount,
    EmployeeID: userInfo.EmployeeID,
    UserName: userInfo.UserName,
    Password: userInfo.Password,
    EMailAddress: userInfo.EMailAddress,
    Permissions: ["ToolStatus_W", "ToolStatus_R"],
  };
  try {
    const res = await apiInstance.post("account_info/AddUserAccountInfo", body);
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
};
// Edit user account info
export const apiEditUserAccountInfo = async(editUserInfo, editUserAccountAndPassword)=>{
    const body={
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
          "Tag2Tool_R",
          "Tag2Tool_W"
        ],
        "UserAccount": editUserInfo.AccountID,
        "ModifyData": {
          "Department_ID": editUserInfo.Department,
          "UserName": editUserInfo.UserName,
          "EMailAddress": editUserAccountAndPassword.Email,
          "Password": editUserAccountAndPassword.Password,
          "Authorizations": [
          ]
        }
      }
console.log("boody", body);
      try {
        const res = await apiInstance.post("account_info/ModifyUserAccountInfo", body);
        return res;
      } catch (error) {
        console.error("Error", error);
        return error;
      }
}

// get department info list
export const apiGetDepartmentInfoList = async()=>{
    try{
        const res = await apiInstance.get("account_info/GetDepartmentInfoList")
        return res
    }
    catch(error){
        console.error("Error",error);
        return error
    }
}

// get User login log
export const apiGetAccountLoginLogList = async(accountID)=>{
    const body={
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
          "Tag2Tool_R",
          "Tag2Tool_W"
        ],
        "RecordsPerPage": 99,
        "PageNo": 1,
        "StartTime": "2023-08-23",
        "EndTime": "2023-12-31",
        "AccountID": accountID
      }
    const res = await apiInstance.post("account_info/GetAccountLoginLogList", body)
    return res
}

// get user account info by user account id
export const apiGetUserAccountInfoByAccountID = async(accountID)=>{
    const body={
        "UserAccount": accountID
      }
    const res = await apiInstance.post("account_info/GetUserAccountInfo", body)
    return res
}

// getToolInfoByID
export const apiGetToolInfo = async(id)=>{
    const body={
        "ToolSpecID": id
    }
    try{
        const res = await apiInstance.post("tool_info/GetToolInfo",body)
        return res
    }
    catch(error){
        console.error("Error",error);
        return error
    }
}


// getToolSpecOpLogList
export const apiGetToolSpecOpLogList = async (toolSpecID)=>{
    const body={
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
          "Tag2Tool_R",
          "Tag2Tool_W"
        ],
        "RecordsPerPage": 10,
        "PageNo": 1,
        "StartTime": "2023-01-01 13:31:32",
        "EndTime": "2023-12-01 13:58:32",
        "ToolSpecID": toolSpecID
      }
    try{
        const res = await apiInstance.post("tool_info/GetToolSpecOpLogList",body)
        return res
    }
    catch(error){
        console.error("Error",error);
        return error
    }
}


// getDashboardInfoList
export const apiGetDashboardInfoList = async (body) =>{
    try{
        const res = await apiInstance.post("dashboard/GetDashboardInfoList",body)
        return res
    }
    catch(error){
        console.error("Error",error);
        return error
    }
}










// addElabelInfo
export const apiAddElabelInfo = async(elabelInfo)=>{
    const body = {
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
            "Tag2Tool_R",
            "Tag2Tool_W"
        ],
        "eLabelInfo": {
            "LabelCode": elabelInfo.LabelCode,
            "eLabelSN": elabelInfo.eLabelSN,
            "eLabelSpec": {
                "StationCode": elabelInfo.eLabelSpec.StationCode,
                "ArticleID": elabelInfo.eLabelSpec.ArticleID,
                "ArticleName": elabelInfo.eLabelSpec.ArticleName
            }
        }
    }
    console.log("new elabel info body", body);
    try{
        const res = await apiInstance.post("elabel_info/AddELabelInfo",body)
        return res
    }
    catch(error){
        console.error("Error",error);
        return error
    }
}

// getElabelSpecInfoList
export const apiGetElabelSpecInfoList = async()=>{
    const body = {
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
            "Tag2Tool_R",
            "Tag2Tool_W"
        ],
        "RecordsPerPage": 99,
        "PageNo": 1,
    }
    try{
        const res = await apiInstance.post("elabel_info/GetELabelSpecInfoList",body)
        return res
    }
    catch(error){
        console.error("Error",error);
    return error
    }
}

// editElabelInfo
export const apiEditElabelInfo = async(editElabelInfo)=>{
    const body = {
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
          "Tag2Tool_R",
          "Tag2Tool_W"
        ],
        "LabelCode": editElabelInfo.LabelCode,
        "eLabelSN": editElabelInfo.eLabelSN,
        "StationCode": editElabelInfo.StationCode,
        "ArticleID": editElabelInfo.ArticleID,
        "ArticleName": editElabelInfo.ArticleName
      }
      console.log("edit eLabel body",body );
    try{
        const res = await apiInstance.post("elabel_info/ModifyELabelInfo",body)
        return res
    }
    catch(error){
        console.error("Error",error);
    return error
    }
}

// getElabelInfoByLabelCode
export const apiGetElabelInfoByLabelCode = async(labelCode, labelSN)=>{
    const body = {
        "LabelCode": labelCode,
        "eLabelSN": labelSN
      }
    try{
        const res = await apiInstance.post("elabel_info/GetELabelSpecInfo",body)
        return res
    }
    catch(error){
        console.error("Error",error);
    return error
    }
}

// get elabel bind status info list
export const apiGetELabelBindStatusInfoList = async()=>{
    const body = {
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
          "Tag2Tool_R",
          "Tag2Tool_W"
        ],
        "RecordsPerPage": 10,
        "PageNo": 1,
        "BindStatus": 0
      }
      
    try{
        const res = await apiInstance.post("elabel_info/GetELabelBindStatusInfoList",body)
        return res
    }
    catch(error){
        console.error("Error",error);
    return error
    }
}


// bind tool to eLabel
export const apiBindToolToELabel = async(bindToolInfo)=>{
    const body = {
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
          "Tag2Tool_R",
          "Tag2Tool_W"
        ],
        "eLabelToolInfo": {
          "LabelCode": bindToolInfo.LabelCode,
          "ToolSN": bindToolInfo.ToolSN
        }
      }
      console.log("bing tool body", body);
    try{
        const res = await apiInstance.post("elabel_info/SelectEToolCodeInfo",body)
        return res
    }
    catch(error){
        console.error("Error",error);
    return error
    }
}

// disabled e tool code info
export const apiDisabledEToolCodeInfo = async(eLabelCode)=>{
    const body = {
        "eLToolCode": eLabelCode,
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
          "Tag2Tool_R",
          "Tag2Tool_W"
        ]
      }
      console.log("return tool body", body);
    try{
        const res = await apiInstance.post("elabel_info/DisabledEToolCodeInfo",body)
        return res
    }
    catch(error){
        console.error("Error",error);
    return error
    }
}

// get aims aps connect info list
export const apiGetAimsAPsConnectInfoList = async()=>{
    const body = {
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
          "Tag2Tool_R",
          "Tag2Tool_W"
        ],
        "RecordsPerPage": 10,
        "PageNo": 1,
        "status": "",
        "stationCode": ""
      }
      
    try{
        const res = await apiInstance.post("aims_info/GetAimsAPsConnectInfoList",body)
        return res
    }
    catch(error){
        console.error("Error",error);
    return error
    }
}

// sync eLabel Data From Aims
export const apiSyncELabelFromAims = async()=>{
    const body = {
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
          "Tag2Tool_R",
          "Tag2Tool_W"
        ]
      }
    try{
        const res = await apiInstance.post("aims_info/SyncELabelDataFromAims",body)
        return res
    }
    catch(error){
        console.error("Error",error);
    return error
    }
}

// get aims articles list
export const apiGetAimsArticlesList = async(stationCode)=>{
    const body = {
        "stationCode": stationCode
      }
    try{
        const res = await apiInstance.post("aims_info/GetAimsArticlesList",body)
        return res
    }
    catch(error){
        console.error("Error",error);
    return error
    }
}

export const confirmDisable=(text="確定刪除嗎")=>{
    const res = window.confirm(text)
    return res
}