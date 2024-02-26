"use client";

import ToolSpecNew from "@/app/ui/toolInfo/toolSpec/new";
import { confirmDisable } from "@/scripts/apis/base";
import { apiGetToolTypeInFoList } from "@/scripts/apis/tool-info";
import {
  apiDisableToolSpecInfo,
  apiEditToolSpecInfo,
  apiGetToolSpecList,
} from "@/scripts/apis/tool-spec";

import { useEffect, useState } from "react";

export default function Page() {
  const [toolSpecList, setToolSpecList] = useState([
    {
      ToolSpecId: "",
      Name: "",
      ToolTypeData: {
        Id: "",
        Name: "",
      },
      SafetyStock: 1,
      SpecData: {
        BladeDiameter: 1,
        BladeHeight: 1,
        TotalLength: 1,
        HandleDiameter: 1,
      },
      MaxLife: {
        ProcessCnt: 1,
        ProcessTime: 1,
        ProcessLength: 1,
        RepairCnt: 1,
      },
    },
  ]);
  const [editToolSpecInfo, setEditToolSpecInfo] = useState({
    ToolSpecId: "",
    Name: "",
    ToolTypeId: "",
    SafetyStock: 0,
    BladeDiameter: 0,
    BladeHeight: 0,
    TotalLength: 0,
    HandleDiameter: 0,
    ProcessCnt: 0,
    ProcessTime: 0,
    ProcessLength: 0,
    RepairCnt: 0,
  });

  const [toolTypeList, setToolTypeList] = useState([]);

  const [addToolSpecToggle, setAddToolSpecToggle] = useState(false);
  const [editToolSpecToggle, setEditToolSpecToggle] = useState(false);
  const [editToolSpecIndex, setEditToolSpecIndex] = useState(-1);

  const fetchGetToolSpecList = async () => {
    const res = await apiGetToolSpecList();
    const reqInt = res?.data?.Values?.ReqInt;

    if (reqInt === 0) {
      setToolSpecList(res.data.Values.ToolSpecList);
    }
  };

  const fetchGetToolTypeList = async () => {
    const res = await apiGetToolTypeInFoList();
    const reqInt = res?.data?.Values?.ReqInt;

    if (reqInt === 0) {
      setToolTypeList(res.data.Values.ToolTypeMenus);
    }
  };

  const fetchEditToolSpecInfo = async () => {
    const res = await apiEditToolSpecInfo(editToolSpecInfo);
    const reqInt = res?.data?.Values?.ReqInt;
    if (reqInt === 0) {
      fetchGetToolSpecList();
      setEditToolSpecToggle(false);
    }
  };

  const fetchDisabledToolSpecInfo = async (id: string) => {
    const confirm = confirmDisable();
    if (confirm) {
      const res = await apiDisableToolSpecInfo(id);
      const reqInt = res?.data?.Values?.ReqInt;

      if (reqInt === 0) {
        setEditToolSpecToggle(false);
        await fetchGetToolSpecList();
      }
    }
  };
  const handleEditToolSpecInfo = (name: string, value: string | number) => {
    setEditToolSpecInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditToolSpecToggle = (
    index: number,
    state: boolean,
    item?: {
      ToolSpecId: string;
      Name: string;
      ToolTypeData: {
        Id: string;
      };
      SafetyStock: number;
      SpecData: {
        BladeDiameter: number;
        BladeHeight: number;
        TotalLength: number;
        HandleDiameter: number;
      };
      MaxLife: {
        ProcessCnt: number;
        ProcessTime: number;
        ProcessLength: number;
        RepairCnt: number;
      };
    }
  ) => {
    setEditToolSpecIndex(index);
    setEditToolSpecToggle(state);

    if (item) {
      setEditToolSpecInfo({
        ToolSpecId: item.ToolSpecId,
        Name: item.Name,
        ToolTypeId: item.ToolTypeData.Id,
        SafetyStock: item.SafetyStock,
        BladeDiameter: item.SpecData.BladeDiameter,
        BladeHeight: item.SpecData.BladeHeight,
        TotalLength: item.SpecData.TotalLength,
        HandleDiameter: item.SpecData.HandleDiameter,
        ProcessCnt: item.MaxLife.ProcessCnt,
        ProcessTime: item.MaxLife.ProcessTime,
        ProcessLength: item.MaxLife.ProcessLength,
        RepairCnt: item.MaxLife.RepairCnt,
      });
    }
  };

  useEffect(() => {
    fetchGetToolSpecList();
    fetchGetToolTypeList();
  }, []);

  return (
    <div className="w-full p-2 mx-2 bg-gray-900 rounded-md">
      <div className="grid items-center grid-cols-3 mb-4 border-b-2">
        <p className="col-start-2 col-end-2 mx-auto text-2xl ">刀具規格</p>
        <button
          className="p-1 my-2 border rounded-md w-fit hover:bg-gray-300"
          onClick={() => setAddToolSpecToggle(!addToolSpecToggle)}
        >
          新增
        </button>
      </div>

      <div className="w-full">
        <div className={`${addToolSpecToggle ? " block" : "hidden"}`}>
          <ToolSpecNew fetchGetToolSpecList={fetchGetToolSpecList} />
        </div>

        <div className="overflow-auto rounded-t-md ">
          <table>
            <thead>
              <tr className="bg-indigo-500">
                <th className="p-1 text-black whitespace-nowrap ">Id</th>
                <th className="p-1 text-black whitespace-nowrap ">Name</th>
                <th className="p-1 text-black whitespace-nowrap ">ToolType</th>
                <th className="p-1 text-black whitespace-nowrap ">
                  Safety Stock
                </th>
                <th className="p-1 text-black whitespace-nowrap ">
                  Blade Diameter
                </th>
                <th className="p-1 text-black whitespace-nowrap ">
                  Blade Height
                </th>
                <th className="p-1 text-black whitespace-nowrap ">
                  Total Length
                </th>
                <th className="p-1 text-black whitespace-nowrap ">
                  HandleDiameter
                </th>
                <th className="p-1 text-black whitespace-nowrap ">
                  Process Cnt
                </th>
                <th className="p-1 text-black whitespace-nowrap ">
                  Process Time
                </th>
                <th className="p-1 text-black whitespace-nowrap ">
                  Process Length
                </th>
                <th className="p-1 text-black whitespace-nowrap ">
                  Repair Cnt
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {toolSpecList.map((item, index) =>
                editToolSpecToggle && editToolSpecIndex === index ? (
                  <tr key={item.ToolSpecId} className="even:bg-gray-700">
                    <td className="p-1 text-center whitespace-nowrap">
                      {item.ToolSpecId}
                    </td>
                    <td className="p-1 text-center whitespace-nowrap">
                      <input
                        type="text"
                        value={editToolSpecInfo.Name}
                        className="text-center text-black"
                        onChange={(e) =>
                          handleEditToolSpecInfo("Name", e.target.value)
                        }
                      />
                    </td>
                    <td className="p-1 text-center whitespace-nowrap">
                      <select
                        value={editToolSpecInfo.ToolTypeId}
                        className="text-black"
                        onChange={(e) =>
                          handleEditToolSpecInfo("ToolTypeId", e.target.value)
                        }
                      >
                        <option value="">請選擇</option>
                        {toolTypeList.map((item) => (
                          <option
                            key={item.Id}
                            value={item.Id}
                            className="text-black "
                          >
                            {item.Name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-1 text-center whitespace-nowrap">
                      <input
                        type="number"
                        value={editToolSpecInfo.SafetyStock}
                        className="text-center text-black"
                        onChange={(e) =>
                          handleEditToolSpecInfo("SafetyStock", e.target.value)
                        }
                      />
                    </td>
                    <td className="p-1 text-center whitespace-nowrap">
                      <input
                        type="number"
                        value={editToolSpecInfo.BladeDiameter}
                        className="text-center text-black"
                        onChange={(e) =>
                          handleEditToolSpecInfo(
                            "BladeDiameter",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td className="p-1 text-center white space-nowrap">
                      <input
                        type="number"
                        value={editToolSpecInfo.BladeHeight}
                        className="text-center text-black"
                        onChange={(e) =>
                          handleEditToolSpecInfo("BladeHeight", e.target.value)
                        }
                      />
                    </td>
                    <td className="p-1 text-center whitespace-nowrap">
                      <input
                        type="number"
                        value={editToolSpecInfo.TotalLength}
                        className="text-center text-black"
                        onChange={(e) =>
                          handleEditToolSpecInfo("TotalLength", e.target.value)
                        }
                      />
                    </td>
                    <td className="p-1 text-center whitespace-nowrap">
                      <input
                        type="number"
                        value={editToolSpecInfo.HandleDiameter}
                        className="text-center text-black"
                        onChange={(e) =>
                          handleEditToolSpecInfo(
                            "HandleDiameter",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td className="p-1 text-center whitespace-nowrap">
                      <input
                        type="number"
                        value={editToolSpecInfo.ProcessCnt}
                        className="text-center text-black"
                        onChange={(e) =>
                          handleEditToolSpecInfo("ProcessCnt", e.target.value)
                        }
                      />
                    </td>
                    <td className="p-1 text-center whitespace-nowrap">
                      <input
                        type="number"
                        value={editToolSpecInfo.ProcessTime}
                        className="text-center text-black"
                        onChange={(e) =>
                          handleEditToolSpecInfo("ProcessTime", e.target.value)
                        }
                      />
                    </td>
                    <td className="p-1 text-center whitespace-nowrap">
                      <input
                        type="number"
                        value={editToolSpecInfo.ProcessLength}
                        className="text-center text-black"
                        onChange={(e) =>
                          handleEditToolSpecInfo(
                            "ProcessLength",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td className="p-1 text-center whitespace-nowrap">
                      <input
                        type="number"
                        value={editToolSpecInfo.RepairCnt}
                        className="text-center text-black"
                        onChange={(e) =>
                          handleEditToolSpecInfo("RepairCnt", e.target.value)
                        }
                      />
                    </td>
                    <td className="p-1 text-center whitespace-nowrap">
                      <button
                        className="mx-2"
                        onClick={() => fetchEditToolSpecInfo()}
                      >
                        完成
                      </button>
                      <button
                        className="mx-2"
                        onClick={() =>
                          fetchDisabledToolSpecInfo(item.ToolSpecId)
                        }
                      >
                        刪除
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={item.ToolSpecId} className="even:bg-gray-700">
                    <td className="p-1 text-center whitespace-nowrap">
                      {item.ToolSpecId}
                    </td>
                    <td className="p-1 text-center whitespace-nowrap">
                      {item.Name}
                    </td>
                    <td className="p-1 text-center whitespace-nowrap">
                      {item.ToolTypeData.Name}
                    </td>
                    <td className="p-1 text-center whitespace-nowrap">
                      {item.SafetyStock}
                    </td>
                    <td className="p-1 text-center whitespace-nowrap">
                      {item.SpecData.BladeDiameter}
                    </td>
                    <td className="p-1 text-center whitespace-nowrap">
                      {item.SpecData.BladeHeight}
                    </td>
                    <td className="p-1 text-center whitespace-nowrap">
                      {item.SpecData.TotalLength}
                    </td>
                    <td className="p-1 text-center whitespace-nowrap">
                      {item.SpecData.HandleDiameter}
                    </td>
                    <td className="p-1 text-center whitespace-nowrap">
                      {item.MaxLife.ProcessCnt}
                    </td>
                    <td className="p-1 text-center whitespace-nowrap">
                      {item.MaxLife.ProcessTime}
                    </td>
                    <td className="p-1 text-center whitespace-nowrap">
                      {item.MaxLife.ProcessLength}
                    </td>
                    <td className="p-1 text-center whitespace-nowrap">
                      {item.MaxLife.RepairCnt}
                    </td>
                    <td className="p-1 text-center whitespace-nowrap">
                      <button
                        className="mx-2"
                        onClick={() =>
                          handleEditToolSpecToggle(index, true, item)
                        }
                      >
                        編輯
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
