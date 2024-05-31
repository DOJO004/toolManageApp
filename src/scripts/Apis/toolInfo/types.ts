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
    ToolMacLoadingOpsList: ToolLoadingItem[];
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

// toolStock
export interface GetToolStockListResponse {
  Values: {
    ReqInt: number;
    TotalPages: number;
    TotalRecords: number;
    StockToolList: ToolStockItem[];
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
  LastStorageId: number;
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
  Receiver: {
    AccountId: string;
    UserAccount: string;
    EmployeeId: string;
    UserName: string;
  };
  LastModify: string;
}

export interface GetToolStockCountListResponse {
  Values: {
    ReqInt: number;
    StockToolCountList: StockToolCountItem[];
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

export interface ToolStatusItem {
  ToolSn: string;
  LifeStatus: string;
  LifePercentage: number;
  PositionInfo: {
    PositionStatus: number;
    MachineSn: string;
    StorageId: number;
  };
  LastOperator: {
    AccountId: string;
    UserAccount: string;
    EmployeeId: string;
    UserName: string;
  };
  LastModify: string;
}

export interface NewToolStockItem {
  StorageId: string;
  ToolSpecId: string;
  Qty: number;
}

export interface ToolLoadingItem {
  ToolSn: string;
  OpActions: number;
  MachineLoading: {
    MachineId: string;
    AtcNo: number;
    MachineSpec: {
      MachineSn: string;
      MachineName: string;
    };
  };
  StockInfo: {
    StorageNo: number;
  };
  OperatorInfo: {
    AccountId: string;
    UserAccount: string;
    EmployeeId: string;
    UserName: string;
  };
  LogTime: string;
}

// storage
export interface GetStorageListResponse {
  RC: string;
  Values: {
    StorageMenus: StorageMenuItem[];
    TotalRecords: number;
    ReqInt: number;
  };
}

export interface StorageMenuItem {
  TotalCount: number;
  LastModify: string;
  StorageId: number;
  Name: string;
}

export interface NewStorageItem {
  StorageId: number;
  Name: string;
}

export interface EditStorageItem {
  StorageId: number;
  Name: string;
}

export interface BasicResponse {
  data: {
    RC: string;
    Values: {
      ReqInt: number;
      MultiStorageIds: number[];
    };
  };
}
