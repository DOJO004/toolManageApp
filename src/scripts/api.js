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

// addToolSpecInfo
export const apiAddToolSpecInfo = async (newToolSpecID, newToolName, newToolType, newBladeDiameter, newBladeHeight, newTotalLength, newHandleDiameter,  newSafetyStock, newProcessCnt, newProcessTime, newProcessLength, newRepairCnt)=>{
    const body = {
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
            "Tag2Tool_R",
            "Tag2Tool_W"
        ],
        "ToolsData": {
            "ToolSpecID": newToolSpecID,
            "Name": newToolName,
            "ToolType": newToolType,
            "Specification": {
                "BladeDiameter": newBladeDiameter,
                "BladeHeight": newBladeHeight,
                "TotalLength": newTotalLength,
                "HandleDiameter": newHandleDiameter
            },
            "SafetyStock": newSafetyStock,
            "MaxLife": {
                "ProcessCnt": newProcessCnt,
                "ProcessTime": newProcessTime,
                "ProcessLength": newProcessLength,
                "RepairCnt": newRepairCnt
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
export const apiModifyToolSpecInfo = async ( 
            modifyToolSpecID,
            modifyToolType,
            modifyBladeDiameter,
            modifyBladeHeight,
            modifyTotalLength,
            modifyHandleDiameter,
            modifySafetyStock,
            modifyProcessCnt,
            modifyProcessTime,
            modifyProcessLength,
            modifyRepairCnt
            )=>{
    const body = {
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
            "Tag2Tool_R",
            "Tag2Tool_W"
        ],
        "ModifyDatas": {
            "ToolSpecID": modifyToolSpecID,
            "ToolType": modifyToolType,
            "Specification": {
                "BladeDiameter": modifyBladeDiameter,
                "BladeHeight": modifyBladeHeight,
                "TotalLength": modifyTotalLength,
                "HandleDiameter": modifyHandleDiameter
            },
            "SafetyStock": modifySafetyStock,
            "MaxLife": {
                "ProcessCnt": modifyProcessCnt,
                "ProcessTime": modifyProcessTime,
                "ProcessLength": modifyProcessLength,
                "RepairCnt": modifyRepairCnt
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
export const disabledToolInfo = async (body)=>{
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
export const apiAddProductLineInfo = async (body)=>{
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
export const apiModifyProductLineInfo = async (body)=>{
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
export const disabledProductLineInfo = async (body) =>{
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
export const apiGetMachineStatusInfoList = async()=>{
    const body ={
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
          "Tag2Tool_R",
          "Tag2Tool_W"
        ],
        "RecordsPerPage": 10,
        "PageNo": 1,
        "ProductLineID": "",
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
export const apiAddMachineSpecInfo = async (productLineID, machineTypeID, machineSN, machineName, machineIP, readerID,brand,series, mt, axisIndex, axisName, isSpindle) =>{
    const body = {
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
            "Tag2Tool_R",
            "Tag2Tool_W"
        ],
        "MachineInfo": {
            "ProductLineID": productLineID,
            "MachineTypeID": machineTypeID,
            "MachineSN": machineSN,
            "MachineName": machineName,
            "MachineIP": machineIP,
            "ReaderID": readerID,
            "SystemInfo": {
                "Brand": brand,
                "Series": series,
                "MT": mt
            },
            "AxisInfos": [
                {
                    "AxisIndex": axisIndex,
                    "AxisName": axisName,
                    "IsSpindle": isSpindle
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

// modifyMachineTypeInfo
export const apiModifyMachineTypeInfo = async (modifyMachineTypeID, modifyMachineTypeName) =>{
    const body = {
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
            "Tag2Tool_R",
            "Tag2Tool_W"
        ],
        "ModifyData":
        {
            "MachineTypeID": modifyMachineTypeID,
            "MachineTypeName": modifyMachineTypeName,
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