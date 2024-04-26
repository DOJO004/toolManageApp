
export interface GetProductLineListResponse{
   "data": {
    "Values": {
        "ProductLineList": ProductLineItem[],
        "TotalRecords": number,
        "ReqInt": number
    }
},
}

export interface ProductLineItem{
    Id: string,
    Name: string
}

interface BaseResponse{
    "RC": string,
    "Values": {
        "ReqInt": number
    }
}
export interface PostProductLineResponse{
    data:BaseResponse
}

export interface PatchProductLineResponse{
    data:BaseResponse
}

export interface DeleteProductLineResponse{
    data:BaseResponse
}
