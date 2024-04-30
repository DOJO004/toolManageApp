export interface PoliceInfoList{
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

export interface NewPoliceItemInfo {
    PermissionId: string,
    Name: string,
    PermissionType: number
}
  
export interface EditPoliceItemInfo {
    PermissionId: string,
    Name: string,
    PermissionType: number
}