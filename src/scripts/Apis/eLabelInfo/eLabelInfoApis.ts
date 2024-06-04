import { apiInstance } from "../eLabelInfoApi";
import { getLoginTime, getPermission, getUserToken } from "../mainApi";
import {
  BaseResponse,
  BindToolDataItem,
  EditLabelItem,
  GetBindLabelListResponse,
  GetELabelListResponse,
  NewLabelItem,
  ReturnDataItem,
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

//取得綁定的刀具
export async function apiGetBindLabelList() {
  try {
    const res = await apiInstance.get<GetBindLabelListResponse>(
      "/label_get/GetLabelToolBindInfoList?ActivateStatus=1"
    );
    console.log("api get bind label list = ", res);

    const { Values } = res.data;
    if (Values.ReqInt === 0) {
      return Values.LabelBindList;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error", error);
    return [];
  }
}

// 綁定刀具
export async function apiBindELabelInfo(data: BindToolDataItem) {
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
    const res = await apiInstance.post<BaseResponse>(
      "/user_operate/SelectLabelBindInfo",
      body
    );
    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

// 解除綁定
export async function apiDeleteLabelBindInfo(label: ReturnDataItem) {
  const body = {
    RevertorId: label.RevertorId,
    LToolCode: label.LToolCode,
    StorageId: label.StorageId,
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: [getPermission()],
  };
  console.log("return tool body = ", body);

  try {
    const res = await apiInstance.post<BaseResponse>(
      "/user_operate/DisableLabelBindInfo",
      body
    );
    return res.data.Values.ReqInt;
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
