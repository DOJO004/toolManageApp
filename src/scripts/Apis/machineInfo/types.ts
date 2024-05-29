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
