export interface BaseResponse {
  RC: string;
  Values: {
    ReqInt: number;
  };
}

// product line
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
