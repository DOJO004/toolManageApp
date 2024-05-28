import { apiInstance } from "@/scripts/toolInfoApi";
import { getLoginTime, getUserToken } from "../mainApi";

type GetToolStockListResponse = {
  RC: string;
  Values: {
    StockToolList: any[];
    ReqInt: number;
  };
};

export async function apiGetToolStockList(): Promise<any[]> {
  try {
    const res = await apiInstance.get<GetToolStockListResponse>(
      "tool_get/GetToolStockInfoList?RecordsPerPage=999"
    );
    console.log(`apiGetToolStockList`, res);
    const { Values } = res.data;
    if (Values.ReqInt === 0) {
      return Values.StockToolList;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error", error);
    return [];
  }
}

export async function apiNewToolStock(toolStock) {
  const body = {
    StorageId: toolStock.StorageId,
    ToolStockInfos: [
      {
        ToolSpecId: toolStock.ToolSpecId,
        Qty: toolStock.Qty,
      },
    ],
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: ["Tag2Tool_R", "Tag2Tool_W"],
  };
  console.log("new tool stock body", body);
  try {
    const res = await apiInstance.post("user_operate/AddToolStockInfo", body);
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiDeleteToolStock(toolStock) {
  const body = {
    ToolStockId: toolStock.Id,
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: ["Tag2Tool_R", "Tag2Tool_W"],
  };
  try {
    const res = await apiInstance.post(
      "user_operate/DisabledToolStockInfo",
      body
    );
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiGetToolStockCountList() {
  try {
    const res = await apiInstance.get("/tool_get/GetToolStockCountList");
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}
