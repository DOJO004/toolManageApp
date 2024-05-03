import { apiInstance } from "@/scripts/machineInfoApi";
import { getLoginTime, getUserToken } from "../mainApi";

export async function apiGetMachineSpecList() {
  try {
    const res = await apiInstance.get("/machine_get/GetMachineSpecInfoList");
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiNewMachineSpec(machineSpec) {
  const body = {
    MachineSpecData: {
      ProductLineId: machineSpec.ProductLineId,
      MachineTypeId: machineSpec.MachineTypeId,
      SerialNumber: machineSpec.SerialNumber,
      Name: machineSpec.Name,
      MachineIP: machineSpec.MachineIP,
      ReaderId: machineSpec.ReaderId,
      SystemInfo: {
        Brand: machineSpec.Brand,
        Series: machineSpec.Series,
        MT: machineSpec.MT,
      },
      AxisSettingList: [
        {
          AxisIndex: machineSpec.AxisIndex,
          AxisName: machineSpec.AxisName,
          IsSpindle: machineSpec.IsSpindle,
        },
      ],
    },
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: ["Tag2Tool_R", "Tag2Tool_W"],
  };
  console.log("new machine spec body", body);
  try {
    const res = await apiInstance.post(
      "/user_operate/AddMachineSpecInfo",
      body
    );
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiEditMachineSpec(machineSpec) {
  const body = {
    MachineId: machineSpec.MachineId,
    ModifyData: {
      ProductLineId: machineSpec.ProductLineId,
      MachineTypeId: machineSpec.MachineTypeId,
      SerialNumber: machineSpec.SerialNumber,
      Name: machineSpec.Name,
      MachineIP: machineSpec.MachineIP,
      ReaderId: machineSpec.ReaderId,
      SystemInfo: {
        Brand: machineSpec.Brand,
        Series: machineSpec.Series,
        MT: machineSpec.MT,
      },
      AxisSettingList: [
        {
          AxisIndex: machineSpec.AxisIndex,
          AxisName: machineSpec.AxisName,
          IsSpindle: machineSpec.IsSpindle,
        },
      ],
    },
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: ["Tag2Tool_R", "Tag2Tool_W"],
  };
  console.log("editMachineSpec", body);
  try {
    const res = await apiInstance.post(
      "/user_operate/ModifyMachineSpecInfo",
      body
    );
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiDeleteMachineSpec(machineSpec) {
  const body = {
    MachineId: machineSpec.MachineId,
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: ["Tag2Tool_R", "Tag2Tool_W"],
  };
  console.log("deleteMachineSpec", body);
  try {
    const res = await apiInstance.post(
      "user_operate/DisabledMachineSpecInfo",
      body
    );
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}
