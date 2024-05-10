export interface GetProductLineListResponse {
  data: {
    Values: {
      ProductLineList: ProductLineItem[];
      TotalRecords: number;
      ReqInt: number;
    };
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

interface BaseResponse {
  RC: string;
  Values: {
    ReqInt: number;
  };
}
export interface PostProductLineResponse {
  data: BaseResponse;
}

export interface PatchProductLineResponse {
  data: BaseResponse;
}

export interface DeleteProductLineResponse {
  data: BaseResponse;
}
