export interface PermissionInfoList{
    data: {
        Values: {
            PermissionMenus: PermissionMenuItem [],
            TotalRecords: number,
            ReqInt: number
        }
    },
}

export interface PermissionMenuItem{
    Id: string,
    LastModify: string,
    Name: string,
    PermissionType: number
}

export interface NewPermissionItemInfo {
    PermissionId: string,
    Name: string,
    PermissionType: number
}
  
export interface EditPermissionItemInfo {
    PermissionId: string,
    Name: string,
    PermissionType: number
}