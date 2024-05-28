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
