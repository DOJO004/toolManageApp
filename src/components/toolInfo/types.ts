export interface GetToolStockListResponse {
  data: {
    Values: {
      ReqInt: number;
      TotalPages: number;
      TotalRecords: number;
      ToolStockList: ToolStockItem[];
    };
  };
}

export interface ToolStockItem {
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
  LoadingData: {
    IsLoading: boolean;
    MachineId: string;
    AtcNo: number;
  };
  LastModify: string;
}

export interface GetToolInfoData {
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

export interface GetToolLoadingLogResponse {
  data: {
    RC: string;
    Values: {
      ToolMacLoadingOpsList: ToolLoadingItem[];
      TotalRecords: number;
      TotalPages: number;
      ReqInt: number;
    };
  };
}

export interface ToolLoadingItem {
  ToolSn: string;
  OpActions: number;
  StockInfo: {
    StorageNo: number;
  };
  MachineLoading: {
    MachineId: string;
    AtcNo: number;
    MachineSpec: {
      MachineSn: string;
      MachineName: string;
    };
  };
  UserInfo: {
    AccountId: string;
    UserAccount: string;
    EmployeeId: string;
    UserName: string;
  };
  OperatorInfo: {
    AccountId: string;
    UserAccount: string;
    EmployeeId: string;
    UserName: string;
  };
  LogTime: string;
}
