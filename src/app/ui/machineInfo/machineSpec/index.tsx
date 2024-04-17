"use client";

import {
  apiDeleteMachineSpec,
  apiEditMachineSpec,
  apiGetMachineSpecList,
} from "@/scripts/Apis/machineSpec/machineSpec";
import { apiGetMachineTypeList } from "@/scripts/Apis/machineType/machineType";
import { apiGetProductLineTypeList } from "@/scripts/Apis/productLineType/productLineType";
import React, { useEffect, useState } from "react";
import {
  GetMachineTypeListResponse,
  MachineTypeItem,
} from "../machineType/types";
import {
  GetProductLineListResponse,
  ProductLineItem,
} from "../productLine/types";
import NewMachineSpec from "./new";
import {
  DeleteMachineSpecResponse,
  EditMachineSpecItem,
  GetMachineSpecListResponse,
  MachineSpecItem,
  PatchMachineSpecResponse,
} from "./types";

const MachineSpecIndex = () => {
  const [productLineList, setProductLineList] = useState<ProductLineItem[]>([]);
  const [machineTypeList, setMachineTypeList] = useState<MachineTypeItem[]>([]);
  const [machineSpecList, setMachineSpecList] = useState<MachineSpecItem[]>([]);
  const [newMachineSpecMode, setNewMachineSpecMode] = useState(false);
  const [editMachineSpecMode, setEditMachineSpecMode] = useState(false);
  const [editMachineSpecModeIndex, setEditMachineSpecModeIndex] = useState(-1);
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

  const getProductLineList = async () => {
    const data = await apiGetProductLineTypeList();
    const res = data as GetProductLineListResponse;
    if (res?.data?.Values?.ReqInt === 0) {
      setProductLineList(res.data.Values.ProductLineList);
    }
  };

  const getMachineTypeList = async () => {
    const data = await apiGetMachineTypeList();
    const res = data as GetMachineTypeListResponse;
    if (res?.data?.Values?.ReqInt === 0) {
      setMachineTypeList(res.data.Values.MachineTypeList);
    }
  };

  const getMachineSpecList = async () => {
    const data = await await apiGetMachineSpecList();
    const res = data as GetMachineSpecListResponse;
    console.log(res);

    if (res?.data?.Values?.ReqInt === 0) {
      setMachineSpecList(res.data.Values.MachineeSpecList);
    }
  };

  const patchMachineSpec = async () => {
    const data = await apiEditMachineSpec(editMachineSpec);
    const res = data as PatchMachineSpecResponse;
    console.log("patch machine spec", res);

    if (res?.data?.Values?.ReqInt === 0) {
      getMachineSpecList();
      setEditMachineSpecMode(false);
    }
  };

  const deleteMachineSpec = async () => {
    const confirm = window.confirm(`確定要刪除 ${editMachineSpec.Name} 嗎?`);
    if (confirm) {
      const data = await apiDeleteMachineSpec(editMachineSpec);
      const res = data as DeleteMachineSpecResponse;
      if (res?.data?.Values?.ReqInt === 0) {
        getMachineSpecList();
        setEditMachineSpecMode(false);
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

  const clickEditMachineSpec = (
    machineSpec: EditMachineSpecItem,
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
    <div className="relative flex w-full p-1 text-center ">
      <div className="w-full mx-4">
        <div className="relative ">
          <button
            className="absolute top-0 right-0 p-1 border rounded-md hover:bg-gray-600"
            onClick={() => handleNewMachineSpecMode()}
          >
            新增
          </button>
          <h2 className="my-4">設備規格</h2>
        </div>
        {/* new */}
        <div
          className={` overflow-hidden transition-all duration-300 ease-in-out ${
            newMachineSpecMode ? "h-52" : "h-0"
          }`}
        >
          <NewMachineSpec
            getMachineSpecList={getMachineSpecList}
            setNewMachineSpecMode={setNewMachineSpecMode}
          />
        </div>

        <div className="mt-2 overflow-auto bg-gray-700 rounded-t-lg">
          <table className="w-full ">
            <thead className="">
              <tr className="bg-indigo-500 ">
                <th className="p-1 whitespace-nowrap">生產線</th>
                <th className="p-1 whitespace-nowrap">設備類型名稱</th>
                <th className="p-1 whitespace-nowrap">設備 SN 序號</th>
                <th className="p-1 whitespace-nowrap">設備名稱</th>
                <th className="p-1 whitespace-nowrap">品牌</th>
                <th className="p-1 whitespace-nowrap">系列</th>
                <th className="p-1 whitespace-nowrap">設備IP位址</th>
                <th className="p-1 whitespace-nowrap">讀取器ID</th>
                <th className="p-1 whitespace-nowrap">編輯</th>
              </tr>
            </thead>
            <tbody>
              {machineSpecList.length > 0 &&
                machineSpecList.map((item, index) => (
                  <React.Fragment key={item.MachineId}>
                    {editMachineSpecMode &&
                    editMachineSpecModeIndex === index ? (
                      <tr>
                        <td>
                          <select
                            value={editMachineSpec.ProductLineId}
                            className="w-32 text-center text-black rounded-md"
                            onChange={(e) =>
                              handleEditMachineSpec(
                                "ProductLineId",
                                e.target.value
                              )
                            }
                          >
                            {productLineList.map((item) => (
                              <option
                                key={item.Id}
                                value={item.Id}
                                className="text-black"
                              >
                                {item.Name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select
                            className="w-32 text-center text-black rounded-md"
                            value={editMachineSpec.MachineTypeId}
                            onChange={(e) =>
                              handleEditMachineSpec(
                                "MachineTypeId",
                                e.target.value
                              )
                            }
                          >
                            {machineTypeList.map((item) => (
                              <option
                                value={item.Id}
                                key={item.Id}
                                className="text-black "
                              >
                                {item.Name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input
                            type="text"
                            className="w-32 text-center text-black rounded-md"
                            value={editMachineSpec.SerialNumber}
                            onChange={(e) =>
                              handleEditMachineSpec(
                                "SerialNumber",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="w-32 text-center text-black rounded-md"
                            value={editMachineSpec.Name}
                            onChange={(e) =>
                              handleEditMachineSpec("Name", e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="w-32 text-center text-black rounded-md"
                            value={editMachineSpec.Brand}
                            onChange={(e) =>
                              handleEditMachineSpec("Brand", e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="w-32 text-center text-black rounded-md"
                            value={editMachineSpec.Series}
                            onChange={(e) =>
                              handleEditMachineSpec("Series", e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="w-32 text-center text-black rounded-md"
                            value={editMachineSpec.MachineIP}
                            onChange={(e) =>
                              handleEditMachineSpec("MachineIP", e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="w-32 text-center text-black rounded-md"
                            value={editMachineSpec.ReaderId}
                            onChange={(e) =>
                              handleEditMachineSpec("ReaderId", e.target.value)
                            }
                          />
                        </td>
                        <td className="p-1 whitespace-nowrap">
                          <button
                            className="p-1 bg-green-500 rounded-md hover:bg-green-600"
                            onClick={() => patchMachineSpec()}
                          >
                            完成
                          </button>
                          <span> / </span>
                          <button
                            className="p-1 bg-red-500 rounded-md hover:bg-red-900"
                            onClick={() => deleteMachineSpec()}
                          >
                            刪除
                          </button>
                        </td>
                      </tr>
                    ) : (
                      <tr key={item.MachineId} className="hover:bg-gray-500">
                        <td className="p-1 whitespace-nowrap">
                          {item.ProductLineData.Name}
                        </td>
                        <td className="p-1 whitespace-nowrap">
                          {item.MachineTypeData.Name}
                        </td>
                        <td className="p-1 whitespace-nowrap">
                          {item.SerialNumber}
                        </td>
                        <td className="p-1 whitespace-nowrap">{item.Name}</td>
                        <td className="p-1 whitespace-nowrap">
                          {item.SystemData.Brand}
                        </td>
                        <td className="p-1 whitespace-nowrap">
                          {item.SystemData.Series}
                        </td>
                        <td className="p-1 whitespace-nowrap">
                          {item.MachineIP}
                        </td>
                        <td className="p-1 whitespace-nowrap">
                          {item.ReaderId}
                        </td>

                        <td className="p-1 whitespace-nowrap">
                          <button
                            className="p-1 hover:bg-gray-900"
                            onClick={() => clickEditMachineSpec(item, index)}
                          >
                            編輯
                          </button>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MachineSpecIndex;
