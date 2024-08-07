export interface GetMachineStatusInfoListResponse {
  data: {
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
