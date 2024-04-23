export interface DepartmentList{
    data:{
        Values: {
            DepartmentMenus: DepartmentItem[],
            TotalRecords: number,
            ReqInt: number
        }
    }
}
  
export interface DepartmentItem{
    Id: string,
    LastModify: string,
    Name: string
}

export interface NewDepartmentItem{
    DepartmentId: string,
    Name: string,
}
export interface EditDepartmentItem{
    DepartmentId: string,
    Name: string,
}

export interface PostDepartmentResponse{
    data:{
        RC: string,
            Values: {
            ReqInt: number,
            MultiDepartmentIds: [
                string
            ]
        }
    }
  }