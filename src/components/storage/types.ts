export interface GetStorageListResponse {
  data: {
    RC: string;
    Values: {
      StorageMenus: StorageItem[];
      TotalRecords: number;
      ReqInt: number;
    };
  };
}

export interface StorageItem {
  TotalCount: number;
  LastModify: string;
  StorageId: number;
  Name: string;
}

export interface EditStorageItem {
  StorageId: number;
  Name: string;
}

export interface NewStorageResponse {
  data: {
    RC: string;
    Values: {
      ReqInt: number;
      MultiStorageIds: number[];
    };
  };
}

export interface PatchStorageResponse {
  data: {
    RC: string;
    Values: {
      ReqInt: number;
    };
  };
}

export interface DeleteStorageResponse {
  data: {
    RC: string;
    Values: {
      ReqInt: number;
    };
  };
}
