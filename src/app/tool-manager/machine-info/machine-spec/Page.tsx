"use client";
import { useNotice } from "@/components/context/NoticeContext";
import MachineSpecIndex from "@/components/machineInfo/machineSpec";
import NewMachineSpec from "@/components/machineInfo/machineSpec/new";
import {
  DeleteMachineSpecResponse,
  EditMachineSpecItem,
  MachineSpecItem,
  NewMachineSpecItem,
  PatchMachineSpecResponse,
} from "@/components/machineInfo/machineSpec/types";
import { MachineTypeItem } from "@/components/machineInfo/machineType/types";
import { ProductLineItem } from "@/components/machineInfo/productLine/types";
import {
  apiDeleteMachineSpec,
  apiEditMachineSpec,
  apiGetMachineSpecList,
  apiGetMachineTypeList,
  apiGetProductLineTypeList,
  apiNewMachineSpec,
} from "@/scripts/Apis/machineInfo/machineInfo";
import { AlertColor } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";

export default function Page() {
  const { setShowNotice } = useNotice();
  const [productLineList, setProductLineList] = useState<ProductLineItem[]>([]);
  const [machineTypeList, setMachineTypeList] = useState<MachineTypeItem[]>([]);
  const [machineSpecList, setMachineSpecList] = useState<MachineSpecItem[]>([]);

  const [newMachineSpec, setNewMachineSpec] = useState<NewMachineSpecItem>({
    ProductLineId: "",
    MachineTypeId: "",
    SerialNumber: "",
    Name: "",
    MachineIP: "",
    ReaderId: "",
    Brand: "",
    Series: "",
    MT: "",
    AxisIndex: 0,
    AxisName: "",
    IsSpindle: false,
  });

  const [newMachineSpecMode, setNewMachineSpecMode] = useState(false);
  const [editMachineSpecMode, setEditMachineSpecMode] = useState(false);
  const [editMachineSpecModeIndex, setEditMachineSpecModeIndex] = useState(-1);
  const [editMachineSpec, setEditMachineSpec] = useState<EditMachineSpecItem>({
    MachineId: "",
    ProductLineId: "",
    MachineTypeId: "",
    SerialNumber: "",
    Name: "",
    MachineIP: "",
    ReaderId: "",
    Brand: "",
    Series: "",
    MT: "",
    AxisIndex: 0,
    AxisName: "",
    IsSpindle: false,
  });

  const getProductLineList = async () => {
    setProductLineList(await apiGetProductLineTypeList());
  };

  const getMachineTypeList = async () => {
    setMachineTypeList(await apiGetMachineTypeList());
  };

  const getMachineSpecList = async () => {
    setMachineSpecList(await apiGetMachineSpecList());
  };

  const postMachineSpec = async (e: FormEvent) => {
    e.preventDefault();
    const reqInt = await apiNewMachineSpec(newMachineSpec);
    if (reqInt === 0) {
      cleanNewMachineSpec();
      getMachineSpecList();
      handleNotice("success", true, "新增成功");
    } else {
      handleNotice("error", true, `新增失敗errorCode = ${reqInt}`);
    }
  };

  const cleanNewMachineSpec = () => {
    setNewMachineSpec({
      ProductLineId: "",
      MachineTypeId: "",
      SerialNumber: "",
      Name: "",
      MachineIP: "",
      ReaderId: "",
      Brand: "",
      Series: "",
      MT: "",
      AxisIndex: 0,
      AxisName: "",
      IsSpindle: false,
    });
  };

  const handleNewMachineSpec = (
    key: string,
    value: string | number | boolean
  ) => {
    setNewMachineSpec((prev) => ({ ...prev, [key]: value }));
  };

  const patchMachineSpec = async () => {
    const data = await apiEditMachineSpec(editMachineSpec);
    const res = data as PatchMachineSpecResponse;
    const reqInt = res?.data?.Values?.ReqInt;
    if (reqInt === 0) {
      getMachineSpecList();
      setEditMachineSpecMode(false);
      handleNotice("success", true, "更新成功");
    } else {
      handleNotice("error", true, `更新失敗，errorCode = ${reqInt}`);
    }
  };

  const deleteMachineSpec = async () => {
    const confirm = window.confirm(`確定要刪除 ${editMachineSpec.Name} 嗎?`);
    if (confirm) {
      const data = await apiDeleteMachineSpec(editMachineSpec);
      const res = data as DeleteMachineSpecResponse;
      const reqInt = res?.data?.Values?.ReqInt;
      if (reqInt === 0) {
        getMachineSpecList();
        setEditMachineSpecMode(false);
        handleNotice("success", true, "刪除成功");
      } else {
        handleNotice("error", true, `刪除失敗，errorCode = ${reqInt}`);
      }
    }
  };

  const handleNewMachineSpecMode = () => {
    setNewMachineSpecMode(!newMachineSpecMode);
    setEditMachineSpecMode(false);
  };

  const handleEditMachineSpec = (key: string, value: string) => {
    setEditMachineSpec((prev) => ({ ...prev, [key]: value }));
  };

  const handleNotice = (type: AlertColor, show: boolean, messages: string) => {
    setShowNotice({
      type: type,
      show: show,
      messages: messages,
    });
  };

  let timer: ReturnType<typeof setTimeout>;
  const searchMachineSpec = (value: string) => {
    clearTimeout(timer);

    timer = setTimeout(async () => {
      const data = await getMachineSpecList();
      if (data) {
        const filterData = data.filter((item) => {
          return (
            item.Name.toLowerCase().includes(value.toLowerCase()) ||
            item.MachineId.toLowerCase().includes(value.toLowerCase())
          );
        });
        setMachineSpecList(filterData);
      }
    }, 500);
  };

  const clickEditMachineSpec = (
    machineSpec: MachineSpecItem,
    index: number
  ) => {
    setEditMachineSpecMode(true);
    setNewMachineSpecMode(false);
    setEditMachineSpec({
      MachineId: machineSpec.MachineId,
      ProductLineId: machineSpec.ProductLineData.Id,
      MachineTypeId: machineSpec.MachineTypeData.Id,
      SerialNumber: machineSpec.SerialNumber,
      Name: machineSpec.Name,
      MachineIP: machineSpec.MachineIP,
      ReaderId: machineSpec.ReaderId,
      Brand: machineSpec.SystemData.Brand,
      Series: machineSpec.SystemData.Series,
      MT: machineSpec.SystemData.MT,
      AxisIndex: machineSpec.AxisSettingDatas[0].AxisIndex,
      AxisName: machineSpec.AxisSettingDatas[0].AxisName,
      IsSpindle: machineSpec.AxisSettingDatas[0].IsSpindle,
    });
    setEditMachineSpecModeIndex(index);
  };

  useEffect(() => {
    getProductLineList();
    getMachineTypeList();
    getMachineSpecList();
  }, []);

  return (
    <div className="relative w-full p-4 text-center ">
      <div className="w-full ">
        <div className="relative ">
          <button
            className="absolute top-0 right-0 p-1 m-2 border rounded-md hover:bg-gray-600"
            onClick={() => handleNewMachineSpecMode()}
          >
            新增
          </button>
          <div>
            <h2 className="my-4">設備規格</h2>
            <input
              type="search"
              placeholder="搜尋 ID / 名稱"
              className="w-full p-2 text-black rounded-md max-w-96 "
              onChange={(e) => searchMachineSpec(e.target.value)}
            />
          </div>
        </div>
        {/* new */}
        <div
          className={` overflow-hidden transition-all my-4 duration-300 ease-in-out ${newMachineSpecMode ? "h-68" : "h-0"}`}
        >
          <NewMachineSpec
            setNewMachineSpecMode={setNewMachineSpecMode}
            postMachineSpec={postMachineSpec}
            newMachineSpec={newMachineSpec}
            handleNewMachineSpec={handleNewMachineSpec}
            productLineList={productLineList}
            machineTypeList={machineTypeList}
          />
        </div>

        <div className="mt-2 overflow-auto bg-gray-900 rounded-md ">
          <MachineSpecIndex
            machineSpecList={machineSpecList}
            editMachineSpecMode={editMachineSpecMode}
            editMachineSpecModeIndex={editMachineSpecModeIndex}
            editMachineSpec={editMachineSpec}
            handleEditMachineSpec={handleEditMachineSpec}
            productLineList={productLineList}
            machineTypeList={machineTypeList}
            patchMachineSpec={patchMachineSpec}
            deleteMachineSpec={deleteMachineSpec}
            clickEditMachineSpec={clickEditMachineSpec}
          />
        </div>
      </div>
    </div>
  );
}
