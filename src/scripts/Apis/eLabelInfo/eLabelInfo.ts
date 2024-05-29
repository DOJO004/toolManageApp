import { apiInstance } from "../../eLabelInfoApi";
import { getLoginTime, getPermission, getUserToken } from "../mainApi";
import {
  BaseResponse,
  EditLabelItem,
  GetELabelListResponse,
  NewLabelItem,
} from "./types";

// ELabelList
export const apiGetELabelList = async () => {
  try {
    const res = await apiInstance.get<GetELabelListResponse>(
      "/label_get/GetLabelSpecInfoList"
    );
    if (res.data.Values.ReqInt === 0) {
      return res.data.Values.LabelList;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error", error);
    return [];
  }
};

export async function apiNewELabel(eLabel: NewLabelItem) {
  const body = {
    LabelBrandId: eLabel.LabelBrandId,
    LabelInfo: {
      LabelSn: eLabel.LabelSn,
      AimsLabel: {
        LabelCode: eLabel.LabelCode,
        NfcRecord: eLabel.NfcRecord,
        StationCode: eLabel.StationCode,
        ArticleInfo: {
          ArticleID: eLabel.ArticleID,
          ArticleName: eLabel.ArticleName,
        },
      },
    },
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: [getPermission()],
  };
  try {
    const res = await apiInstance.post<BaseResponse>(
      "/user_operate/AddLabelInfo",
      body
    );
    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiEditELabel(eLabel: EditLabelItem) {
  const body = {
    LabelId: eLabel.LabelId,
    LabelInfo: {
      LabelSn: eLabel.LabelSn,
      AimsLabel: {
        LabelCode: eLabel.LabelCode,
        NfcRecord: eLabel.NfcRecord,
        StationCode: eLabel.StationCode,
        ArticleInfo: {
          ArticleID: eLabel.ArticleId,
          ArticleName: eLabel.ArticleName,
        },
      },
    },
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: [getPermission()],
  };
  try {
    const res = await apiInstance.post<BaseResponse>(
      "/user_operate/ModifyLabelInfo",
      body
    );
    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiDeleteELabel(eLabel: EditLabelItem) {
  const body = {
    LabelId: eLabel.LabelId,
    LabelSn: eLabel.LabelSn,
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: [getPermission()],
  };
  try {
    const res = await apiInstance.post<BaseResponse>(
      "/user_operate/DisabledLabelInfo",
      body
    );
    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

// 綁定刀具
export async function apiBindELabelInfo(data) {
  const body = {
    ReceiptorId: data.ReceiptorId,
    LabelId: data.LabelId,
    LabelSn: data.LabelSn,
    ToolSn: data.ToolSn,
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: [getPermission()],
  };
  console.log("body", body);
  try {
    const res = await apiInstance.post(
      "/user_operate/SelectLabelBindInfo",
      body
    );
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

// 解除綁定
export async function apiDeleteLableBindInfo(label) {
  const body = {
    LToolCode: label.LToolCode,
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: ["Tag2Tool_R", "Tag2Tool_W"],
  };
  try {
    const res = await apiInstance.post(
      "/user_operate/DisableLabelBindInfo",
      body
    );
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

// 停用標籤綁定指定庫存刀具
export async function apiDeleteLabelBindByTool(tool) {
  const body = {
    ToolSn: tool.ToolSn,
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: ["Tag2Tool_R", "Tag2Tool_W"],
  };
  try {
    const res = await apiInstance.post(
      "/user_operate/DisableLabelBindInfoByToolSn",
      body
    );
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

// 手動同步 AIMS 電子標籤
export async function syncELabelDataFromAims() {
  const body = {
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: [getPermission()],
  };

  try {
    const res = await apiInstance.post<BaseResponse>(
      "/user_operate/ManualSyncLabelDataFromAims",
      body
    );
    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}
