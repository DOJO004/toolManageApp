export interface GetToolStockCountListResponse {
  data: {
    Values: {
      ReqInt: number;
      StockToolCountList: StockToolCountItem[];
    };
  };
}

export interface StockToolCountItem {
  ToolSpecId: string;
  ToolTypeData: {
    Id: string;
    Name: string;
  };
  ToolSpecName: string;
  SafetyStock: number;
  CurrentStock: number;
  WarningCount: number;
  AlarmCount: number;
  ToolStatusList: ToolStatusItem[];
}

export interface NewToolStockItem {
  StorageId: string;
  ToolSpecId: string;
  Qty: number;
}

export interface GetToolStockListResponse {
  data: {
    Values: {
      ReqInt: number;
      ToolStockList: ToolStockItem[];
    };
  };
}

export interface GetToolStockInfoListResponse {
  data: {
    Values: {
      ReqInt: number;
      StockToolList: ToolStockListItem[];
    };
  };
}

export interface ToolStockListItem {
  ToolSn: string;
  ToolSpecId: string;
  ToolSpecName: string;
  ToolTypeData: {
    Id: string;
    Name: string;
  };
  LifeStatus: string;
  LifePercentage: number;
  SpecData: {
    BladeDiameter: number;
    BladeHeight: number;
    TotalLength: number;
    HandleDiameter: number;
  };
  LifeData: {
    ProcessCnt: number;
    ProcessTime: number;
    ProcessLength: number;
    RepairCnt: number;
  };
  MaxLife: {
    ProcessCnt: number;
    ProcessTime: number;
    ProcessLength: number;
    RepairCnt: number;
  };
  Receiver: {
    AccountId: string;
    UserAccount: string;
    EmployeeId: string;
    UserName: string;
  };
  PositionData: {
    PositionStatus: number;
    StorageInfo: {
      StorageNo: number;
    };
    LoadingInfo: {
      MachineId: string;
      AtcNo: number;
      MachineSpec: {
        MachineSn: string;
        MachineName: string;
      };
    };
  };
  LastModify: string;
}

export interface ToolStockItem {
  ToolSpecId: string;
  ToolTypeData: {
    Id: string;
    Name: string;
  };
  ToolSpecName: string;
  SafetyStock: number;
  CurrentStock: number;
  WarningCount: number;
  AlarmCount: number;
  ToolStatusList: ToolStatusItem[];
}

export interface ToolStatusItem {
  ToolSn: string;
  LifeStatus: string;
  LifePercentage: number;
  LastModify: string;
}

interface BaseResponse {
  RC: string;
  Values: {
    ReqInt: number;
  };
}

export interface PostToolStockResponse {
  data: BaseResponse;
}

export interface PatchToolStockResponse {
  data: BaseResponse;
}

export interface DeleteToolStockResponse {
  data: BaseResponse;
}
