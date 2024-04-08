import { apiInstance } from "@/scripts/machineInfoApi";

export async function apiGetMachineTypeList() {
  try {
    const res = await apiInstance.get("/machine_get/GetMachineTypeInfoList");
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiNewMachineType(machineType) {
  const body = {
    MachineTypeList: [
      {
        Id: machineType.Id,
        Name: machineType.Name,
      },
    ],
  };
  try {
    const res = await apiInstance.post(
      "/sync_operate/SyncAddMachineTypeInfo",
      body
    );
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiEditMachineType(machineType) {
  const body = {
    Id: machineType.Id,
    ModifyData: {
      Name: machineType.Name,
    },
  };
  try {
    const res = await apiInstance.post(
      "/user_operate/ModifyMachineTypeInfo",
      body
    );
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiDeleteMachineType(machineType) {
  const body = {
    DisabledMachineTypeIds: [machineType.Id],
  };
  try {
    const res = await apiInstance.post(
      "/user_operate/DisabledMachineTypeInfo",
      body
    );
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}
