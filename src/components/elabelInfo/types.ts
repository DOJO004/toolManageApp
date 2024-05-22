export interface GetELabelListResponse {
  data: {
    Values: {
      TotalRecords: number;
      TotalPages: number;
      ReqInt: number;
      LabelList: LabelItem[];
    };
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

export interface EditLabelData {
  LabelId: string;
  LabelSn: string;
  LabelCode: string;
  NfcRecord: string;
  StationCode: string;
  ArticleId: string;
  ArticleName: string;
}

export interface SyncLabelDataFromAimsResponse {
  data: {
    RC: string;
    Values: {
      ReqInt: 0;
    };
  };
}

interface BaseResponse {
  RC: string;
  Values: {
    ReqInt: number;
  };
}

export interface PostELabelInfoResponse {
  data: BaseResponse;
}

export interface PatchELabelInfoResponse {
  data: BaseResponse;
}

export interface DeleteELabelInfoResponse {
  data: BaseResponse;
}
