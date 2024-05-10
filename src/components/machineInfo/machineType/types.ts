export interface GetMachineTypeListResponse {
  data: {
    RC: string;
    Values: {
      MachineTypeList: MachineTypeItem[];
      TotalRecords: number;
      ReqInt: number;
    };
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

interface BaseResponse {
  RC: string;
  Values: {
    ReqInt: number;
  };
}
export interface PostMachineTypeResponse {
  data: BaseResponse;
}

export interface PatchMachineTypeResponse {
  data: BaseResponse;
}

export interface DeleteMachineTypeResponse {
  data: BaseResponse;
}
