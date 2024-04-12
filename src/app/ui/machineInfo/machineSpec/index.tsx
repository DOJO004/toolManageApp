"use client";

import { apiGetMachineSpecList } from "@/scripts/Apis/machineSpec/machineSpec";
import { useEffect, useState } from "react";
import EditMachineSpec from "./edit";
import NewMachineSpec from "./new";
import {
  EditMachineSpecItem,
  GetMachineSpecListResponse,
  MachineSpecItem,
} from "./types";

const MachineSpecIndex = () => {
  const [machineSpecList, setMachineSpecList] = useState<MachineSpecItem[]>([]);
  const [newMachineSpecMode, setNewMachineSpecMode] = useState(false);
  const [editMachineSpecMode, setEditMachineSpecMode] = useState(false);
  const [editMachineSpec, setEditMachineSpec] = useState({
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

  const getMachineSpecList = async () => {
    const data = await await apiGetMachineSpecList();
    const res = data as GetMachineSpecListResponse;
    if (res?.data?.Values?.ReqInt === 0) {
      setMachineSpecList(res.data.Values.MachineeSpecList);
    }
  };

  const handleNewMachineSpecMode = () => {
    setNewMachineSpecMode(!newMachineSpecMode);
    setEditMachineSpecMode(false);
  };

  const clickEditMachineSpec = (machineSpec: EditMachineSpecItem) => {
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
  };

  useEffect(() => {
    getMachineSpecList();
  }, []);

  return (
    <div className="relative flex w-full p-1 text-center ">
      <div className="w-full mx-4">
        <div className="relative ">
          <button
            className="absolute top-0 right-0 border rounded-md hover:bg-gray-600"
            onClick={() => handleNewMachineSpecMode()}
          >
            新增
          </button>
          <h2 className="my-4">設備規格</h2>
        </div>

        <div className="mt-2 overflow-auto bg-gray-700 rounded-t-lg">
          <table className="w-full ">
            <thead className="">
              <tr className="bg-indigo-500 ">
                <th className="p-1 ">生產線</th>
                <th className="p-1 ">設備ID</th>
                <th className="p-1 ">設備SN序號</th>
                <th className="p-1 ">設備名稱</th>
                <th className="p-1 ">品牌</th>
                <th className="p-1 ">系列</th>
                <th className="p-1 ">設備IP位址</th>
                <th className="p-1 ">讀取器ID</th>
                <th className="p-1 ">MT</th>
              </tr>
            </thead>
            <tbody>
              {machineSpecList.map((item) => {
                return (
                  <tr
                    key={item.MachineId}
                    onClick={() => clickEditMachineSpec(item)}
                    className="cursor-pointer hover:bg-gray-700"
                  >
                    <td className="p-1 ">{item.ProductLineData.Name}</td>
                    <td className="p-1 ">{item.MachineId}</td>
                    <td className="p-1 ">{item.SerialNumber}</td>
                    <td className="p-1 ">{item.Name}</td>
                    <td className="p-1 ">{item.SystemData.Brand}</td>
                    <td className="p-1 ">{item.SystemData.Series}</td>
                    <td className="p-1 ">{item.MachineIP}</td>
                    <td className="p-1 ">{item.ReaderId}</td>
                    <td className="p-1 ">{item.SystemData.MT}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* new */}
      <div
        className={` overflow-hidden transition-all duration-300 ease-in-out ${
          newMachineSpecMode ? "w-1/2" : "w-0"
        }`}
      >
        <NewMachineSpec
          getMachineSpecList={getMachineSpecList}
          setNewMachineSpecMode={setNewMachineSpecMode}
        />
      </div>
      {/* edit */}
      <div
        className={` overflow-hidden transition-all duration-300 ease-in-out ${
          editMachineSpecMode ? "w-1/2" : "w-0"
        }`}
      >
        <EditMachineSpec
          editMachineSpec={editMachineSpec}
          setEditMachineSpec={setEditMachineSpec}
          getMachineSpecList={getMachineSpecList}
          setEditMachineSpecMode={setEditMachineSpecMode}
        />
      </div>
    </div>
  );
};

export default MachineSpecIndex;
