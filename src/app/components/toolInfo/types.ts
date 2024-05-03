export interface GetToolStockListResponse{
    data: {
    Values: {
        ReqInt: number,
        TotalPages: number,
        TotalRecords: number,
        ToolStockList: ToolStockItem[]
    }
    }
}

export interface ToolStockItem {
    ToolSn: string,
    ToolSpecId: string,
    ToolSpecName: string,
    ToolTypeData: {
        Id: string,
        Name: string
    },
    LifeStatus: string,
    LifePercentage: number,
    SpecData: {
        BladeDiameter: number,
        BladeHeight: number,
        TotalLength: number,
        HandleDiameter: number
    },
    LifeData: {
        ProcessCnt: number,
        ProcessTime: number,
        ProcessLength: number,
        RepairCnt: number
    },
    LoadingData: {
        IsLoading: boolean,
        MachineId: string,
        AtcNo: number
    },
    LastModify: string
}

export interface GetToolInfoData{
    ToolSn: string,
    ToolSpecId: string,
    ToolSpecName: string,
    ToolTypeData: {
        Id: string,
        Name: string
    },
    LifeStatus: string,
    LifePercentage: number,
    SpecData: {
        BladeDiameter: number,
        BladeHeight: number,
        TotalLength: number,
        HandleDiameter: number
    },
    LifeData: {
        ProcessCnt: number,
        ProcessTime: number,
        ProcessLength: number,
        RepairCnt: number
    },
    PositionData: {
        PositionStatus: number,
        StorageInfo: {
          StorageNo: number
        },
        LoadingInfo: {
          MachineId: string,
          AtcNo: number,
          MachineSpec: {
            MachineSn: string,
            MachineName: string
          }
        }
    },
    LastModify: string
}

export interface GetToolLoadingLogResponse {
    data:{
        Values: {
        ToolMacLoadingOpsList: ToolLoadingItem[],
        TotalRecords: number,
        TotalPages: number,
        ReqInt: number
        }
    }
  }

export interface ToolLoadingItem  {
    ToolSn: string,
    MachineId: string,
    MachineSpec: {
      MachineSn: string,
      MachineName: string
    },
    OpActions: string,
    AtcNo: number,
    LogTime: string
  }