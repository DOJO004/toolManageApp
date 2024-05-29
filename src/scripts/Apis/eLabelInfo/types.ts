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
      ArticleID: string;
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
