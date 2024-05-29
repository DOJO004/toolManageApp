import { apiInstance } from "@/scripts/machineInfoApi.js";
import {
  BaseResponse,
  EditProductLineItem,
  GetProductLineListResponse,
  NewProductLineItem,
  ProductLineItem,
} from "./types";

// productLine
export async function apiGetProductLineTypeList(): Promise<ProductLineItem[]> {
  try {
    const res = await apiInstance.get<GetProductLineListResponse>(
      "/machine_get/GetProductLineInfoList"
    );
    const { Values } = res.data;
    console.log("apiGetProductLineTypeList", res);

    if (Values.ReqInt === 0) {
      return Values.ProductLineList;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error", error);
    return [];
  }
}

export async function apiNewProductLineType(
  productLineType: NewProductLineItem
) {
  const body = {
    ProductLineList: [
      {
        Id: productLineType.Id,
        Name: productLineType.Name,
        DepartmentId: productLineType.DepartmentId,
      },
    ],
  };
  try {
    const res = await apiInstance.post<BaseResponse>(
      "/sync_operate/SyncAddProductLineInfo",
      body
    );
    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiEditProductLineType(
  productLineType: EditProductLineItem
) {
  const body = {
    Id: productLineType.Id,
    ModifyData: {
      Name: productLineType.Name,
      DepartmentId: productLineType.DepartmentId,
    },
  };
  try {
    const res = await apiInstance.post<BaseResponse>(
      "/sync_operate/SyncModifyProductLineInfo",
      body
    );
    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiDeleteProductLineType(
  productLineType: EditProductLineItem
) {
  const body = {
    DisabledProductLineIds: [productLineType.Id],
  };
  try {
    const res = await apiInstance.post<BaseResponse>(
      "/sync_operate/SyncDisabledProductLineInfo",
      body
    );
    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}
