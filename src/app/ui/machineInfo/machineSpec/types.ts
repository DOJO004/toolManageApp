export interface GetMachineSpecListResponse {
  data: {
    RC: string;
    Values: {
      MachineeSpecList: MachineSpecItem[];
      TotalRecords: 50;
      TotalPages: 5;
      ReqInt: 0;
    };
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


export interface EditMachineSpecItem {
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

interface BaseResponse{
  RC: string
  Values: {
    ReqInt: number
  }
}

export interface PostMachineSpecResponse{
  data: BaseResponse
}

export interface PatchMachineSpecResponse{
  data: BaseResponse
}

export interface DeleteMachineSpecResponse{
  data: BaseResponse
}