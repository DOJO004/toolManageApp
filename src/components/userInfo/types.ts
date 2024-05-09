
export interface UserInfoList{
    data:{
        Values: {
        UserAccountList: UserAccountItem[],
        TotalRecords: number,
        TotalPages:number,
        ReqInt:number
        }
    }
}
  
export interface UserAccountItem{
    AccountId: string,
    Department: {
      Id: string,
      LastModify: string,
      Name: string
    },
    UserAccount: string,
    EmployeeId: string,
    UserName: string,
    PermissionList: [
      {
        Id: string,
        LastModify: string,
        Name: string,
        PermissionType: number
      }
    ],
    EMail: string,
    Activated: number,
    CreateTime: string,
    LastModify: string
}

export interface EditUserInfo{
  AccountId: string,
  OgnPwd: string,
  UserPwd: string | null,
  UserName: string,
  DepartmentId: string,
  EmployeeId: string,
  EMailAddress: string,
}

export interface NewUserInfo{
  UserAccount: string,
  Password: string,
  UserName: string,
  DepartmentId: string,
  EmployeeId: string,
  EMailAddress: string,
  PermissionData: string[],
}

export interface NewUserResponse{
  data: {
    RC: string,
    Values: {
        ReqInt: number,
        UnknownPermissionIds: string[]
    }
  },
}