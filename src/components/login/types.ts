export interface LoginResponse {
  data: {
    RC: string;
    Values: {
      ReqInt: number;
      Token: string;
      LoginTime: string;
      UserInfo: {
        DepartmentInfo: {
          DepartmentId: string;
          Name: string;
        };
        UserAccount: string;
        EmployeeId: string;
        UserName: string;
      };
      PermissionList: string[];
    };
  };
}
