import { apiInstance } from "../../eLabelInfoApi";
import { getLoginTime, getUserToken } from "../mainApi";

export async function apiGetELabelList() {
  try {
    const res = await apiInstance.get("/label_get/GetLabelSpecInfoList");
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiNewELabel(eLabel) {
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
    NeedPermissions: ["Tag2Tool_R", "Tag2Tool_W"],
  };
  try {
    const res = await apiInstance.post("/user_operate/AddLabelInfo", body);
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiEditELabel(eLabel) {
  const body = {
    LabelId: eLabel.LabelId,
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
    NeedPermissions: ["Tag2Tool_R", "Tag2Tool_W"],
  };
  try {
    const res = await apiInstance.post("/user_operate/ModifyLabelInfo", body);
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiDeleteELabel(eLabel) {
  const body = {
    LabelId: eLabel.LabelId,
    LabelSn: eLabel.LabelSn,
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: ["Tag2Tool_R", "Tag2Tool_W"],
  };
  try {
    const res = await apiInstance.post("/user_operate/DisabledLabelInfo", body);
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function syncELabelDataFromAims() {
  const body = {
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: ["Tag2Tool_R", "Tag2Tool_W"],
  };

  try {
    const res = await apiInstance.post(
      "/user_operate/ManualSyncLabelDataFromAims",
      body
    );
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}
