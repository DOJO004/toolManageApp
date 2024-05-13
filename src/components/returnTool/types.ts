export interface GetBindLabelListResponse {
  data: {
    RC: string;
    Values: {
      LabelBindList: LabelBindItem[];
      TotalRecords: number;
      TotalPages: number;
      ReqInt: number;
    };
  };
}

export interface LabelBindItem {
  LToolCode: number;
  Status: number;
  ToolSn: string;
  ToolStatusInfo: {
    ToolStatus: number;
  };
  ReceiptorInfo: {
    AccountId: string;
    UserAccount: string;
    EmployeeId: string;
    UserName: string;
  };
  LabelSpec: {
    LabelId: string;
    LabelSn: string;
    Brand: string;
  };
  LastModify: string;
}

interface BaseResponse {
  RC: string;
  Values: {
    ReqInt: number;
  };
}

export interface DeleteBindLabelResponse {
  data: BaseResponse;
}
