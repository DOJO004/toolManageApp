export interface BindToolDataItem {
    ReceiptorId: string,
    LabelId: string,
    LabelSn: string,
    ToolSn: string,
}
  
export interface PostBindToolResponse{
  data: {
    RC: string,
    Values: {
        ReqInt: number
    }
},
}