export interface GetBindLabelListResponse {
    data:{
        RC: string,
        Values: {
          LabelBindList: LabelBindItem[],
          TotalRecords: number,
          TotalPages: number,
          ReqInt: number
        }
      }
}

export interface LabelBindItem  {
    LToolCode: number,
    Status: string,
    ToolSn: string,
    ToolStatus: string, // for test
    receiver: string, // for test
    LabelSpec: {
      LabelId: string,
      LabelSn: string,
      Brand: string,
      AimsSpec: {
        LabelCode: string,
        NfcRecord: string,
        StationCode: string,
        ArticleInfo: {
          ArticleID: string,
          ArticleName: string
        }
      }
    },
    LastModify: string
  }

interface BaseResponse{
    RC: string
    Values: {
        ReqInt: number
    }
}

export interface DeleteBindLabelResponse {
    data: BaseResponse
}