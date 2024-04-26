export interface LoginResponse{
    data:{
        RC: string,
        Values: {
            ReqInt: number,
            Token: string,
            LoginTime: string
        }
    }
  }