export interface GetBindLabelListResponse {
    data:{
        "RC": string,
        "Values": {
          "LabelBindList": LabelBindItem[],
          "TotalRecords": number,
          "TotalPages": number,
          "ReqInt": number
        }
      }
}

export interface LabelBindItem  {
    "LToolCode": 16635101992895488,
    "Status": string,
    "ToolSn": string,
    "LabelSpec": {
      "LabelId": string,
      "LabelSn": string,
      "Brand": string,
      "AimsSpec": {
        "LabelCode": string,
        "NfcRecord": string,
        "StationCode": string,
        "ArticleInfo": {
          "ArticleID": string,
          "ArticleName": string
        }
      }
    },
    "LastModify": string
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