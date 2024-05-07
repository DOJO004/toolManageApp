export interface GetMachineStatusInfoListResponse{
    data:{
        RC: string,
        Values: {
          MachineStatusList: MachineStatusItem[],
          TotalRecords: number,
          TotalPages: number,
          ReqInt: number
        }
      }
}

export interface MachineStatusItem{
  Department: {
    Id: string,
    Name: string
  },
  MachineId: string,
  ProductLineData: {
    Id: string,
    Department: {
      Id: string,
      Name: string
    },
    Name: string
  },
  MacTypeData: {
    Id: string,
    Name: string
  },
  SerialNumber: string,
  MachineIP: string,
  SystemData: {
    Brand: string,
    Series: string,
    MT: string
  },
  Status: string,
  StatusKeepTime: number,
  Activation: number,
  ProcessTime: number,
  CurrentParameter: {
    CurrentGcd: number,
    TotalFeedRate: number,
    SpindleRPM: number,
    SpindleLoading: number,
    SpindleSpeed: number,
    CurrentProgram: string
  },
  AtcLoadingList: AtcLoadingItem[],
  LoadingLogList: LoadingLogItem[],
  LastModify: string
}

export interface AtcLoadingItem{
  AtcNo: number,
  ToolSn: string,
  IsUsing: boolean
}

export interface LoadingLogItem{
  TooSN: string,
  Action: string,
  AtcNo: number,
  LogTime: string
}
