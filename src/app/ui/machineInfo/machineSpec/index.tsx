"use client";

import { apiGetMachineSpecList } from "@/scripts/Apis/machineSpec/machineSpec";
import { useEffect, useState } from "react";
import EditMachineSpec from "./edit";
import NewMachineSpec from "./new";

const MachineSpecIndex = () => {
  const [machineSpecList, setMachineSpecList] = useState([]);
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
    Brand: 0,
    Series: "",
    MT: "",
    AxisIndex: 0,
    AxisName: "",
    IsSpindle: false,
  });

  const getMachineSpecList = async () => {
    const res = await await apiGetMachineSpecList();
    if (res?.data?.Values?.ReqInt === 0) {
      setMachineSpecList(res.data.Values.MachineeSpecList);
    }
  };

  const handleNewMachineSpecMode = () => {
    setNewMachineSpecMode(!newMachineSpecMode);
    setEditMachineSpecMode(false);
  };

  const clickEditMachineSpec = (machineSpec: any) => {
    console.log(machineSpec);

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
    <div className="relative w-full p-1 text-center ">
      <div>
        <button
          className="absolute translate-x-[150%] bg-gray-600"
          onClick={() => handleNewMachineSpecMode()}
        >
          新增
        </button>
        <h2 className="my-4">設備規格</h2>
      </div>
      {/* new */}
      <div
        className={` overflow-hidden transition-all duration-300 ease-in-out ${
          newMachineSpecMode ? "h-[32rem]" : "h-0"
        }`}
      >
        <NewMachineSpec getMachineSpecList={getMachineSpecList} />
      </div>
      {/* edit */}
      <div
        className={` overflow-hidden transition-all duration-300 ease-in-out ${
          editMachineSpecMode ? "h-[32rem]" : "h-0"
        }`}
      >
        <EditMachineSpec
          editMachineSpec={editMachineSpec}
          setEditMachineSpec={setEditMachineSpec}
          getMachineSpecList={getMachineSpecList}
          setEditMachineSpecMode={setEditMachineSpecMode}
        />
      </div>
      <div className="mt-2 overflow-auto rounded-t-lg">
        <table className="w-full ">
          <thead className="">
            <tr className="bg-indigo-500 ">
              <th className="p-1 whitespace-nowrap ">生產線</th>
              <th className="p-1 whitespace-nowrap ">設備ID</th>
              <th className="p-1 whitespace-nowrap ">設備SN序號</th>
              <th className="p-1 whitespace-nowrap ">設備名稱</th>
              <th className="p-1 whitespace-nowrap ">品牌</th>
              <th className="p-1 whitespace-nowrap ">系列</th>
              <th className="p-1 whitespace-nowrap ">設備IP位址</th>
              <th className="p-1 whitespace-nowrap ">讀取器ID</th>
              <th className="p-1 whitespace-nowrap ">MT</th>
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
                  <td className="p-1 whitespace-nowrap ">
                    {item.ProductLineData.Name}
                  </td>
                  <td className="p-1 whitespace-nowrap ">{item.MachineId}</td>
                  <td className="p-1 whitespace-nowrap ">
                    {item.SerialNumber}
                  </td>
                  <td className="p-1 whitespace-nowrap ">{item.Name}</td>
                  <td className="p-1 whitespace-nowrap ">
                    {item.SystemData.Brand}
                  </td>
                  <td className="p-1 whitespace-nowrap ">
                    {item.SystemData.Series}
                  </td>
                  <td className="p-1 whitespace-nowrap ">{item.MachineIP}</td>
                  <td className="p-1 whitespace-nowrap ">{item.ReaderId}</td>
                  <td className="p-1 whitespace-nowrap ">
                    {item.SystemData.MT}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MachineSpecIndex;
