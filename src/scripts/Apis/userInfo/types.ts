export interface BaseResponse {
  RC: string;
  Values: {
    ReqInt: number;
  };
}

export interface GetUserInfoListResponse {
  Values: {
    UserAccountList: UserAccountItem[];
    TotalRecords: number;
    TotalPages: number;
    ReqInt: number;
  };
}

export interface UserAccountItem {
  AccountId: string;
  Department: {
    Id: string;
    LastModify: string;
    Name: string;
  };
  UserAccount: string;
  EmployeeId: string;
  UserName: string;
  PermissionList: [
    {
      Id: string;
      LastModify: string;
      Name: string;
      PermissionType: number;
    },
  ];
  EMail: string;
  Activated: number;
  CreateTime: string;
  LastModify: string;
}

export interface EditUserInfo {
  AccountId: string;
  ModifyPassword: string;
  UserName: string;
  DepartmentId: string;
  EmployeeId: string;
  EMailAddress: string;
  PermissionIds: string[];
}

export interface NewUserInfo {
  UserAccount: string;
  Password: string;
  UserName: string;
  DepartmentId: string;
  EmployeeId: string;
  EMailAddress: string;
  PermissionIds: string[];
}

export interface ResetUserPasswordInfo {
  AccountId: string;
  NewPwd: string;
}

export interface UserLoginInfo {
  UserAccount: string;
  UserPwd: string;
}

// department
export interface GetDepartmentListResponse {
  Values: {
    DepartmentMenus: DepartmentItem[];
    TotalRecords: number;
    ReqInt: number;
  };
}

export interface DepartmentItem {
  Id: string;
  LastModify: string;
  Name: string;
}

export interface NewDepartmentItem {
  DepartmentId: string;
  Name: string;
}
export interface EditDepartmentItem {
  DepartmentId: string;
  Name: string;
}

export interface PostDepartmentResponse {
  data: {
    RC: string;
    Values: {
      ReqInt: number;
      MultiDepartmentIds: [string];
    };
  };
}

//permission
export interface GetPermissionInfoListResponse {
  Values: {
    PermissionMenus: PermissionMenuItem[];
    TotalRecords: number;
    ReqInt: number;
  };
}

export interface PermissionMenuItem {
  Id: string;
  LastModify: string;
  Name: string;
  PermissionType: number;
}

export interface NewPermissionItemInfo {
  PermissionId: string;
  Name: string;
  PermissionType: number;
}

export interface EditPermissionItemInfo {
  PermissionId: string;
  Name: string;
  PermissionType: number;
}
