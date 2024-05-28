export interface BaseResponse {
  RC: string;
  Values: {
    ReqInt: number;
  };
}

// toolType
export interface GetToolTypeListResponse {
  RC: string;
  Values: {
    ToolTypeMenus: ToolTypeItem[];
    TotalRecords: number;
    ReqInt: number;
  };
}

export interface ToolTypeItem {
  Id: string;
  Name: string;
}

export interface GetLoadingLogListResponse {
  RC: string;
  Values: {
    ToolMacLoadingOpsList: any[];
    ReqInt: number;
  };
}

// toolSpec
export interface GetToolSpecListResponse {
  Values: {
    ToolSpecList: ToolSpecItem[];
    TotalRecords: number;
    TotalPages: number;
    ReqInt: number;
  };
  status: number;
}

export interface ToolSpecItem {
  ToolSpecId: string;
  Name: string;
  ToolTypeData: {
    Id: string;
    Name: string;
  };
  SafetyStock: number;
  SpecData: {
    BladeDiameter: number;
    BladeHeight: number;
    TotalLength: number;
    HandleDiameter: number;
  };
  MaxLife: {
    ProcessCnt: number;
    ProcessTime: number;
    ProcessLength: number;
    RepairCnt: number;
  };
}

export interface NewToolSpecItem {
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
