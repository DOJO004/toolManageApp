export interface BaseResponse {
  RC: string;
  Values: {
    ReqInt: number;
  };
}

export interface GetELabelListResponse {
  Values: {
    TotalRecords: number;
    TotalPages: number;
    ReqInt: number;
    LabelList: LabelItem[];
  };
}

export interface LabelItem {
  BindStatus: string;
  LabelBind: {
    LToolCode: number;
    ToolSn: string;
  };
  LastModify: string;
  LabelId: string;
  LabelSn: string;
  Brand: string;
  AimsSpec: {
    LabelCode: string;
    NfcRecord: string;
    StationCode: string;
    ArticleInfo: {
      ArticleId: string;
      ArticleName: string;
    };
  };
}

export interface NewLabelItem {
  LabelBrandId: string;
  LabelSn: string;
  LabelCode: string;
  NfcRecord: string;
  StationCode: string;
  ArticleID: string;
  ArticleName: string;
}

export interface EditLabelItem {
  LabelId: string;
  LabelSn: string;
  LabelCode: string;
  NfcRecord: string;
  StationCode: string;
  ArticleId: string;
  ArticleName: string;
}

export interface BindToolDataItem {
  ReceiptorId: string;
  LabelCode: string;
  LabelId: string;
  LabelSn: string;
  ToolSn: string;
}

export interface GetBindLabelListResponse {
  RC: string;
  Values: {
    LabelBindList: LabelBindItem[];
    TotalRecords: number;
    TotalPages: number;
    ReqInt: number;
  };
}

export interface LabelBindItem {
  LToolCode: number;
  Status: number;
  ToolSn: string;
  ToolStatusInfo: {
    ToolStatus: number;
    ToolLifeStatus: string;
    MachineLoading: {
      MachineId: string;
      MachineSn: string;
      MachineName: string;
      AtcNo: number;
    };
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
    AimsSpec: {
      LabelCode: string;
      NfcRecord: string;
      StationCode: string;
      ArticleInfo: {
        ArticleId: string;
        ArticleName: string;
      };
    };
  };
  LastModify: string;
}

export interface ReturnDataItem {
  RevertorId: string;
  LToolCode: number;
  StorageId: number;
  ToolSn: string;
}
