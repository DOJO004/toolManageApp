export interface BaseResponse {
  RC: string;
  Values: {
    ReqInt: number;
  };
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
