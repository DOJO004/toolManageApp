import axios from "axios";
const apiInstance = axios.create({
baseURL:"http://10.45.34.74:8080",
timeout:5000,
headers:{
    "accept": "application/json",
    "Content-Type": "application/json",
}
})

// check retry count
export const reTryAPI = (fetchFunction, retryCount, maxRetry = 3, delay = 5000)=>{
    if (retryCount < maxRetry){
        alert("API request failed... Reload in 5 seconds")
        setTimeout(() => {
            fetchFunction()
        }, delay);
    }else{
        alert("Net work error...")
    }
}

// get user info
export const getUserToken = ()=>{
    const cookies = document.cookie.split(";")
    return cookies[0]?.split("=")[1]
}

export const getLoginTime = ()=>{
    const cookies = document.cookie.split(";")
    return cookies[1]?.split("=")[1]
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
export const apiAddUserAccountInfo = async (
                                            OperatorID,
                                            departmentID,
                                            userAccount,
                                            employeeID,
                                            userName,
                                            password,
                                            eMailAddress
) => {
  const body = {
    OperatorID: OperatorID,
    DepartmentID: departmentID,
    UserAccount: userAccount,
    EmployeeID: employeeID,
    UserName: userName,
    Password: password,
    EMailAddress: eMailAddress,
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



// getToolTypeList 
export const apiGetToolTypeInFoList = async () => {
   try{
        const res = await apiInstance.get("/tool_info/GetToolTypeInfoList")
        return (res)
    }catch(error){
    console.error("Error", error);
    return false
    }
}

// addToolTypeInfo
export const apiAddToolTypeInfo = async (newToolTypeID, newToolName) => {
    const body =
        {
            "UserToken": getUserToken(),
            "LoginTime": getLoginTime(),
            "NeedPermissions": [
                "Tag2Tool_R",
                "Tag2Tool_W"
            ],
            "ToolTypeInfos": [
                {
                    "ToolTypeID": newToolTypeID,
                    "Name": newToolName
                }
            ]
        }
    try {
      const res = await apiInstance.post("tool_info/AddToolTypeInfo",body);
      return res
    }    
    catch (error) {
        console.error("Error", error);
    }
};

// modifyToolTypeInfo
export const apiModifyToolTypeInfo = async (toolTypeID, toolName) =>{
    const body = {
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
            "Tag2Tool_R",
            "Tag2Tool_W"
        ],
        "ModifyData": {
            "ToolTypeID": toolTypeID,
            "Name": toolName
        }
    }
    try{
        const res = await apiInstance.post("tool_info/ModifyToolTypeInfo",body)
        return res
    }
    catch(error){
        console.error("Error",error);
        return error
    }
}

// getToolStock
export const apiGetToolStockList = async () => {
    const body = {
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
            "Tag2Tool_R",
            "Tag2Tool_W"
        ],
        "RecordsPerPage": 999,
        "PageNo": 1,
    }
    try {
        const res = await apiInstance.post("tool_info/GetToolStockInfoList",body)
        return res
    }
    catch(error){
        console.error("Error",error);
        return error
    }
}

// getToolStockStatusInfoList
export const apiGetToolStockStatusInfoList = async (page) => {
    const body = {
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
            "Tag2Tool_R",
            "Tag2Tool_W"
        ],
        "RecordsPerPage": 20,
        "PageNo": page,
    }
    try {
        const res = await apiInstance.post("tool_info/GetToolStockStatusInfoList",body)
        return res
    }
    catch(error){
        console.error("Error",error);
        return error
    }
}

// addToolStock
export const apiAddToolStock = async (toolSpecID, qty) => {
    const body = {
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
            "Tag2Tool_R",
            "Tag2Tool_W"
        ],
        "ToolStockInfos": [
            {
                "ToolSpecID": toolSpecID,
                "Qty": qty
            }
        ]
    }
    try{
        const res = await apiInstance.post("tool_info/AddToolStockInfo",body)
        return res
    }
    catch(error){
        console.error("Error",error);
        return error
    }
}
  
// getToolSpecList
export const apiGetToolSpecList = async ()=>{
    const body = {
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
            "Tag2Tool_R",
            "Tag2Tool_W"
        ],
        "RecordsPerPage": 99
    }
    try{
        const res =  await apiInstance.post("tool_info/GetToolInfoList",body)
        return res
    }
    catch(error){
        console.error("Error",error);
        return error
    }
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

// addToolSpecInfo
export const apiAddToolSpecInfo = async (toolSpecInfo)=>{
    const body = {
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
            "Tag2Tool_R",
            "Tag2Tool_W"
        ],
        "ToolsData": {
            "ToolSpecID": toolSpecInfo.ToolSpecID,
            "Name": toolSpecInfo.Name,
            "ToolType": toolSpecInfo.ToolType,
            "Specification": {
                "BladeDiameter": toolSpecInfo.Specification.BladeDiameter,
                "BladeHeight": toolSpecInfo.Specification.BladeHeight,
                "TotalLength": toolSpecInfo.Specification.TotalLength,
                "HandleDiameter": toolSpecInfo.Specification.HandleDiameter
            },
            "SafetyStock": toolSpecInfo.SafetyStock,
            "MaxLife": {
                "ProcessCnt": toolSpecInfo.MaxLife.ProcessCnt,
                "ProcessTime": toolSpecInfo.MaxLife.ProcessTime,
                "ProcessLength": toolSpecInfo.MaxLife.ProcessLength,
                "RepairCnt": toolSpecInfo.MaxLife.RepairCnt
            }
        }
    }
    try{
        const res =  await apiInstance.post("tool_info/AddToolInfo",body)
        return res
    }
    catch(error){
        console.error("Error",error);
        return error
    }
}

// modifyToolSpecInfo
export const apiModifyToolSpecInfo = async (toolInfo)=>{
    const body = {
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
            "Tag2Tool_R",
            "Tag2Tool_W"
        ],
        "ModifyDatas": {
            "ToolSpecID": toolInfo.ToolSpecID,
            "Name": toolInfo.Name,
            "ToolType": toolInfo.ToolType.split("/")[0],
            "Specification": {
              "BladeDiameter": toolInfo.Specification.BladeDiameter,
              "BladeHeight": toolInfo.Specification.BladeHeight,
              "TotalLength": toolInfo.Specification.TotalLength,
              "HandleDiameter": toolInfo.Specification.HandleDiameter
            },
            "SafetyStock": toolInfo.SafetyStock,
            "MaxLife": {
              "ProcessCnt": toolInfo.MaxLife.ProcessCnt,
              "ProcessTime": toolInfo.MaxLife.ProcessTime,
              "ProcessLength": toolInfo.MaxLife.ProcessLength,
              "RepairCnt": toolInfo.MaxLife.RepairCnt
            }
          }
    }
    try{
        const res =  await apiInstance.post("tool_info/ModifyToolInfo",body)
        return res
    }
    catch(error){
        console.error("Error",error);
        return error
    }
}

// scrapToolStockInfo
export const scrapToolStockInfo = async (body)=>{
    try{
        const res = await apiInstance.post("tool_info/ScrapToolStockInfo",body)
        return res
    }
    catch(error){
        console.error("Error",error);
        return error
    }
}

// repairToolStockInfo
export const repairToolStockInfo = async (body)=>{
    try{
        const res = await apiInstance.post("tool_info/RepairToolStockInfo",body)
        return res
    }
    catch(error){
        console.error("Error",error);
        return error
    }
}

// restorageToolStockInfo
export const restorageToolStockInfo = async (body)=>{
    try{
        const res = await apiInstance.post("tool_info/RestorageToolStockInfo",body)
        return res
    }
    catch(error){
        console.error("Error",error);
        return error
    }
}

// disabledToolTypeInfo
export const disabledToolTypeInfo = async (id)=>{
    const body={
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
          "Tag2Tool_R",
          "Tag2Tool_W"
        ],
        "DisabledToolTypeIDs": [
          id
        ]
      }
    try{
        const res = await apiInstance.post("tool_info/DisabledToolTypeInfo",body)
        return res
    }
    catch(error){
        console.error("Error",error);
        return error
    }
}

// disabledToolInfo
export const disabledToolInfo = async (id)=>{
    const body={
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
          "Tag2Tool_R",
          "Tag2Tool_W"
        ],
        "ToolSpecID": id
      }
    try{
        const res = await apiInstance.post("tool_info/DisabledToolinfo",body)
        return res
    }
    catch(error){
        console.error("Error",error);
        return error
    }
}

// disabledToolStockInfo
export const disabledToolStockInfo = async (body)=>{
    try{
        const res = await apiInstance.post("tool_info/DisabledToolStockInfo",body)
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


// getProductLineInfoList
export const apiGetProductLineInfoList = async ()=>{
    try{
        const res = await apiInstance.get("machine_info/GetProductLineInfoList")
        return res
    }
    catch(error){
        console.error(("Error",error));
        return
    }
}

// addProductLineInfoList
export const apiAddProductLineInfo = async (id,name)=>{
    const body={
            "UserToken": getUserToken(),
            "LoginTime": getLoginTime(),
            "NeedPermissions": [
              "Tag2Tool_R",
              "Tag2Tool_W"
            ],
            "ProductLineInfos": [
              {
                "ProductLineID": id,
                "ProductLineName": name
              }
            ]
    }
    try{
        const res = await apiInstance.post("machine_info/AddProductLineInfo",body)
        return res
    }
    catch(error){
        console.error("Error",error);
        return error
    }
}

// modifyProductLineInfo
export const apiModifyProductLineInfo = async (id,name)=>{
    const body={
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
          "Tag2Tool_R",
          "Tag2Tool_W"
        ],
        "ModifyData": {
          "ProductLineID": id,
          "ProductLineName":name,
        }
      }
    try {
        const res = await apiInstance.post("machine_info/ModifyProductLineInfo",body)
        return res
    }
    catch(error){
        console.error("Error",error);
        return error
    }
}

// disabledProductLineInfo
export const disabledProductLineInfo = async (id) =>{
    const body={
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
          "Tag2Tool_R",
          "Tag2Tool_W"
        ],
        "DisabledProductLineIDs": [
          id
        ]
      }
    try{
        const res = await apiInstance.post("machine_info/DisabledProductLineInfo",body)
        return res
    }
    catch(error){
        console.error("Error",error);
        return error
    }
}

// disableMachineTypeInfo
export const disableMachineTypeInfo = async (id) =>{
    const body = {
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
            "Tag2Tool_R",
            "Tag2Tool_W"
        ],
        "DisabledMachineTypeIDs": [
            id
        ]
    }
    try{
        const res = await apiInstance.post("machine_info/DisabledMachineTypeInfo",body)
        return res
    }
    catch(error){
        console.error("Error",error);
        return error
    }
}

// disableMachineInfo
export const disabledMachineInfo = async (id) =>{
    const body = {
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
          "Tag2Tool_R",
          "Tag2Tool_W"
        ],
        "MachineID": id
      }
      
    try{
        const res = await apiInstance.post("machine_info/DisabledMachineInfo",body)
        return res
    }
    catch(error){
        console.error("Error",error);
        return error
    }
}


// getMachineTypeInfoList
export const apiGetMachineTypeInfoList = async ()=>{
    try{
        const res = await apiInstance.get("machine_info/GetMachineTypeInfoList")
        return res
    }
    catch(error){
        console.error("Error", error);
        return error
    }
}

// getMachineStatusInfoList
export const apiGetMachineStatusInfoList = async(id)=>{
    const body ={
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
          "Tag2Tool_R",
          "Tag2Tool_W"
        ],
        "RecordsPerPage": 99,
        "PageNo": 1,
        "ProductLineID": "",
        "MachineTypeID": "",
        "Status": 10,
        "ActivationBasic": 0
      }
    try{
        const res = await apiInstance.post("machine_info/GetMachineStatusInfoList", body)
        return res
    }
    catch(error){
        console.error("Error", error);
        return error
    }
}

// addMachineTypeInfo
export const apiAddMachineTypeInfo = async (machineTypeID,machineTypeName) =>{
    const body = {
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
            "Tag2Tool_R",
            "Tag2Tool_W"
        ],
        "MachineTypeInfos": [
            {
                "MachineTypeID": machineTypeID,
                "MachineTypeName": machineTypeName,
            }
        ]
    }
    try{
        const res = await apiInstance.post("machine_info/AddMachineTypeInfo", body)
        return res
    }
    catch(error){
        console.error("Error",error);
        return error
    }
}

// addMachineSpecInfo
export const apiAddMachineSpecInfo = async (machineSpec) =>{
    const body = {
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
            "Tag2Tool_R",
            "Tag2Tool_W"
        ],
        "MachineInfo": {
            "ProductLineID": machineSpec.ProductLineID,
            "MachineTypeID": machineSpec.MachineTypeID,
            "MachineSN": machineSpec.MachineSN,
            "MachineName": machineSpec.MachineName,
            "MachineIP": machineSpec.MachineIP,
            "ReaderID": machineSpec.ReaderID,
            "SystemInfo": {
                "Brand": machineSpec.SystemInfo.Brand,
                "Series": machineSpec.SystemInfo.Series,
                "MT": machineSpec.SystemInfo.MT
            },
            "AxisInfos": [
                {
                "AxisIndex": machineSpec.AxisInfos.AxisIndex,
                "AxisName": machineSpec.AxisInfos.AxisName,
                "IsSpindle": machineSpec.AxisInfos.IsSpindle
                }
            ]
        }
    }
    try{
        const res = await apiInstance.post("machine_info/AddMachineInfo",body)
        return res
    }
    catch(error){
        console.error("Error", error);
        return error
    }
}

// getMachineInfoList
export const apiGetMachineInfoList = async () =>{
    const body = {
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
            "Tag2Tool_R",
            "Tag2Tool_W"
        ],
        "RecordsPerPage": 99,
    }
    try{
        const res = await apiInstance.post("machine_info/GetMachineInfoList",body)
        return res
    }
    catch(error){
        console.error("Error",error);
        return error
    }
}

// getMachineInfoByID
export const apiGetMachineInfoByID = async (id) =>{
    const body = {
        "MachineID": id
      }
    try{
        const res = await apiInstance.post("machine_info/GetMachineInfo",body)
        return res
    }
    catch(error){
        console.error("Error",error);
        return error
    }
}

// modifyMachineTypeInfo
export const apiModifyMachineTypeInfo = async (id, name) =>{
    const body = {
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
            "Tag2Tool_R",
            "Tag2Tool_W"
        ],
        "ModifyData":
        {
            "MachineTypeID": id,
            "MachineTypeName": name,
        }
    }
    try{
        const res = await apiInstance.post("machine_info/ModifyMachinTypeInfo",body)
        return res
    }
    catch(error){
        console.error("Error",error);
        return error
    }
}

// editMachineInfo
export const apiEditMachineInfo = async (machineSpec) =>{
    console.log("brnd",machineSpec.SystemInfo.Brand.toString());
    const body = {
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
          "Tag2Tool_R",
          "Tag2Tool_W"
        ],
        "MachineID": machineSpec.MachineID,
        "ModifyDatas": {
          "ProductLineID": machineSpec.ProductLineID.split(":")[0],
          "MachineTypeID": machineSpec.MachineTypeID.split(":")[0],
          "MachineSN": machineSpec.MachineSN,
          "MachineName": machineSpec.MachineName,
          "MachineIP": machineSpec.MachineIP,
          "ReaderID": machineSpec.ReaderID,
          "SystemInfo": {
            "Brand": machineSpec.SystemInfo.Brand.toString(),
            "Series": machineSpec.SystemInfo.Series,
            "MT":machineSpec.SystemInfo.MT
          },
          "AxisInfos": [
            {
              "AxisIndex": machineSpec.AxisInfos[0].AxisIndex,
              "AxisName": machineSpec.AxisInfos[0].AxisName,
              "IsSpindle": machineSpec.AxisInfos[0].IsSpindle
            }
          ]
        }
      }
      console.log("body",body);
    try{
        const res = await apiInstance.post("machine_info/ModifyMachineInfo",body)
        return res
    }
    catch(error){
        console.error("Error",error);
        return error
    }
}

// addElabelInfo
export const apiAddElabelInfo = async(elabelCode, elabelSN, stationCode, articleID, articleName)=>{
    const body = {
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
            "Tag2Tool_R",
            "Tag2Tool_W"
        ],
        "eLabelInfo": {
            "LabelCode": elabelCode,
            "eLabelSN": elabelSN,
            "eLabelSpec": {
                "StationCode": stationCode,
                "ArticleID": articleID,
                "ArticleName": articleName
            }
        }
    }
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
        "RecordsPerPage": 10,
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

export const confirmDisable=()=>{
    const res = window.confirm("確定刪除嗎?")
    return res
}