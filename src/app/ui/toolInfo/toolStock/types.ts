export interface GetToolStockListResponse {
    data: {
    Values: {
        ReqInt: number,
        ToolStockList: ToolStockItem[]
    }
    }
}

export interface ToolStockItem {
    "ToolSn": string,
    "ToolSpecId": string,
    "ToolSpecName": string,
    "ToolTypeData": {
      "Id": string,
      "Name": string
    },
    "LifeStatus": string,
    "LifePercentage": number,
    "SpecData": {
      "BladeDiameter": number,
      "BladeHeight": number,
      "TotalLength": number,
      "HandleDiameter": number
    },
    "LifeData": {
      "ProcessCnt": number,
      "ProcessTime": number,
      "ProcessLength": number,
      "RepairCnt": number
    },
    "LoadingData": {
      "IsLoading": true,
      "MachineId": string,
      "AtcNo": number
    },
    "LastModify": string
  }

interface BaseResponse{
    "RC": string,
    "Values": {
        "ReqInt": number
    },
}

export interface PostToolStockResponse{
    data: BaseResponse
}

export interface PatchToolStockResponse{
    data: BaseResponse
}

export interface DeleteToolStockResponse{
    data: BaseResponse
}