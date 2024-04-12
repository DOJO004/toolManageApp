export interface GetToolSpecListResponse {
   data:{
      Values: {
        ToolSpecList: ToolSpecItem[],
        TotalRecords: number,
        TotalPages: number,
        ReqInt: number
      }
      status:number
   }
}

export interface ToolSpecItem {
    ToolSpecId: string,
    Name: string,
    ToolTypeData: {
        Id: string,
        Name: string
    },
    SafetyStock: number,
    SpecData: {
        BladeDiameter: number,
        BladeHeight: number,
        TotalLength: number,
        HandleDiameter: number,
    },
    MaxLife: {
        ProcessCnt: number,
        ProcessTime: number,
        ProcessLength: number,
        RepairCnt: number
    }
};

export interface editToolSpecItem {
    ToolSpecId: string;
    Name: string;
    ToolTypeId: string;
    SafetyStock: number;
    BladeDiameter: number;
    BladeHeight: number;
    TotalLength: number;
    HandleDiameter: number;
    ProcessCnt: number;
    ProcessTime: number;
    ProcessLength: number;
    RepairCnt: number;
  }
   
interface BaseResponse{
  "RC": string,
  "Values": {
    "ReqInt": number
  }
}

export interface PostToolSpecResponse{
    data: BaseResponse
}

export interface PatchToolSpecResponse{
    data: BaseResponse
}

export interface DeleteToolSpecResponse{
    data: BaseResponse
}