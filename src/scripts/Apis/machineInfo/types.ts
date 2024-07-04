export interface BaseResponse {
  RC: string;
  Values: {
    ReqInt: number;
  };
}

// machineInfo
export interface GetMachineStatusInfoListResponse {
  RC: string;
  Values: {
    ModuleConnect: {
      AcqModuleStatus: boolean;
      AcqModuleLastUpload: string;
    };
    MachineStatusList: MachineStatusItem[];
    TotalRecords: number;
    TotalPages: number;
    ReqInt: number;
  };
}

export interface MachineStatusInfoList {
  ModuleConnect: {
    AcqModuleStatus: boolean;
    AcqModuleLastUpload: string;
  };
  MachineStatusList: MachineStatusItem[];
  TotalRecords: number;
  TotalPages: number;
  ReqInt: number;
}

export interface MachineStatusItem {
  Department: {
    Id: string;
    Name: string;
  };
  MachineId: string;
  ProductLineData: {
    Id: string;
    Department: {
      Id: string;
      Name: string;
    };
    Name: string;
  };
  MacTypeData: {
    Id: string;
    Name: string;
  };
  SerialNumber: string;
  MachineIP: string;
  SystemData: {
    Brand: string;
    Series: string;
    MT: string;
  };
  Status: string;
  StatusKeepTime: number;
  TotalConnectTime: number;
  Activation: number;
  ProcessTime: number;
  CurrentParameter: {
    CurrentGcd: number;
    TotalFeedRate: number;
    SpindleRPM: number;
    SpindleLoading: number;
    SpindleSpeed: number;
    CurrentProgram: string;
  };
  AtcLoadingList: AtcLoadingItem[];
  LoadingLogList: LoadingLogItem[];
  LastModify: string;
}

export interface AtcLoadingItem {
  AtcNo: number;
  ToolSn: string;
  IsUsing: boolean;
  ToolLife: {
    LifeStatus: string;
    LifePercentage: number;
  };
}

export interface LoadingLogItem {
  TooSN: string;
  Action: string;
  AtcNo: number;
  LogTime: string;
}

// productLine
export interface GetProductLineListResponse {
  Values: {
    ProductLineList: ProductLineItem[];
    TotalRecords: number;
    ReqInt: number;
  };
}

export interface ProductLineItem {
  Id: string;
  Name: string;
  Department: {
    Id: string;
    Name: string;
  };
}
export interface NewProductLineItem {
  Id: string;
  Name: string;
  DepartmentId: string;
}
export interface EditProductLineItem {
  Id: string;
  Name: string;
  DepartmentId: string;
}

// machineType
export interface GetMachineTypeListResponse {
  RC: string;
  Values: {
    MachineTypeList: MachineTypeItem[];
    TotalRecords: number;
    ReqInt: number;
  };
}

export interface MachineTypeItem {
  Id: string;
  Name: string;
}

export interface NewMachineTypeItem {
  Id: string;
  Name: string;
}
export interface EditMachineTypeItem {
  Id: string;
  Name: string;
}

// machineSpec
export interface GetMachineSpecListResponse {
  RC: string;
  Values: {
    MachineeSpecList: MachineSpecItem[];
    TotalRecords: 50;
    TotalPages: 5;
    ReqInt: 0;
  };
}

export interface MachineSpecItem {
  MachineId: string;
  ProductLineData: {
    Id: string;
    Name: string;
  };
  MachineTypeData: {
    Id: string;
    Name: string;
  };
  SerialNumber: string;
  Name: string;
  MachineIP: string;
  ReaderId: string;
  SystemData: {
    Brand: string;
    Series: string;
    MT: string;
  };
  AxisSettingDatas: [
    {
      AxisIndex: number;
      AxisName: string;
      IsSpindle: boolean;
    },
  ];
}

export interface NewMachineSpecItem {
  ProductLineId: string;
  MachineTypeId: string;
  SerialNumber: string;
  Name: string;
  MachineIP: string;
  ReaderId: string;
  Brand: string;
  Series: string;
  MT: string;
  AxisIndex: number;
  AxisName: string;
  IsSpindle: boolean;
}

export interface EditMachineSpecItem {
  MachineId: string;
  ProductLineId: string;
  MachineTypeId: string;
  SerialNumber: string;
  Name: string;
  MachineIP: string;
  ReaderId: string;
  Brand: string;
  Series: string;
  MT: string;
  AxisIndex: number;
  AxisName: string;
  IsSpindle: boolean;
}
