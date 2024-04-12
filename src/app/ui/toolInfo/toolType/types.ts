export interface GetToolTypeListResponse {
    data: {
        "RC": string
        "Values": {
            "ToolTypeMenus": ToolTypeItem[]
        "TotalRecords": number,
        "ReqInt": number
        }
    }
}

export interface ToolTypeItem {
    "Id": string,
    "Name": string
}

interface BaseResponse {
    "RC": string
    "Values": {
        "ReqInt": number
    }
}

export interface PostToolTypeResponse{
    data: BaseResponse
}

export interface PatchToolTypeResponse{
    data: BaseResponse
}

export interface DeleteToolTypeResponse{
    data: BaseResponse
}