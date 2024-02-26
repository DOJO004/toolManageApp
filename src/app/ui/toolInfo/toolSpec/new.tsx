"use client";

import { apiGetToolTypeInFoList } from "@/scripts/apis/tool-info";
import { apiAddToolSpecInfo } from "@/scripts/apis/tool-spec";
import { FormEvent, useEffect, useState } from "react";

interface ToolSpecNewProps {
  fetchGetToolSpecList: () => void;
}

export default function ToolSpecNew({
  fetchGetToolSpecList,
}: ToolSpecNewProps) {
  const [toolTypeList, setToolTypeList] = useState([
    {
      Id: "",
      Name: "",
    },
  ]);

  const [toolSpecInfo, setToolSpecInfo] = useState({
    ToolSpecId: "",
    Name: "",
    ToolTypeId: "",
    SafetyStock: "",
    BladeDiameter: "",
    BladeHeight: "",
    TotalLength: "",
    HandleDiameter: "",
    ProcessCnt: "",
    ProcessTime: "",
    ProcessLength: "",
    RepairCnt: "",
  });

  const [newToolSpecPage, setNewToolSpecPage] = useState(1);

  const fetchAddToolSpecInfo = async (e: FormEvent) => {
    e.preventDefault();
    const res = await apiAddToolSpecInfo(toolSpecInfo);
    const reqInt = res?.data?.Values?.ReqInt;

    if (reqInt === 0) {
      fetchGetToolSpecList();
      setNewToolSpecPage(1);
      setToolSpecInfo({
        ToolSpecId: "",
        Name: "",
        ToolTypeId: "",
        SafetyStock: "",
        BladeDiameter: "",
        BladeHeight: "",
        TotalLength: "",
        HandleDiameter: "",
        ProcessCnt: "",
        ProcessTime: "",
        ProcessLength: "",
        RepairCnt: "",
      });
    }
    console.log(res);
  };

  const fetchGetToolTypeList = async () => {
    const res = await apiGetToolTypeInFoList();
    const reqInt = res?.data?.Values?.ReqInt;

    if (reqInt === 0) {
      setToolTypeList(res.data.Values.ToolTypeMenus);
    }
  };

  const handleToolSpecInfoInput = (name: string, value: string | number) => {
    setToolSpecInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const changePage = (e: FormEvent, page: number) => {
    e.preventDefault();
    setNewToolSpecPage(page);
  };

  useEffect(() => {
    fetchGetToolTypeList();
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => fetchAddToolSpecInfo(e)}
        className="max-w-xl mx-auto mb-4 border-b-2"
      >
        <div className={` ${newToolSpecPage === 1 ? "block" : "hidden"}`}>
          <p className="text-center ">●○○</p>
          <label htmlFor="toolSpecID">ID</label>
          <input
            type="text"
            name="toolSpecID"
            className="input"
            value={toolSpecInfo.ToolSpecId}
            onChange={(e) =>
              handleToolSpecInfoInput("ToolSpecId", e.target.value)
            }
          />
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className="input"
            value={toolSpecInfo.Name}
            onChange={(e) => handleToolSpecInfoInput("Name", e.target.value)}
          />
          <label htmlFor="ToolTypeID">ToolTypeID</label>
          <select
            name="ToolTypeID"
            className="input"
            value={toolSpecInfo.ToolTypeId}
            onChange={(e) =>
              handleToolSpecInfoInput("ToolTypeId", e.target.value)
            }
          >
            <option value="">請選擇</option>
            {toolTypeList.map((item) => {
              return (
                <option key={item.Id} value={item.Id} className="text-black ">
                  {item.Name}
                </option>
              );
            })}
          </select>
          <button
            className="w-full p-1 my-4 bg-indigo-500 rounded-md hover:bg-indigo-700 "
            onClick={(e) => changePage(e, 2)}
          >
            下一步
          </button>
        </div>
        <div className={` ${newToolSpecPage === 2 ? "block" : "hidden"}`}>
          <p className="text-center ">○●○</p>
          <label htmlFor="safetyStock">safetyStock</label>
          <input
            type="number"
            name="safetyStock"
            className="input"
            value={toolSpecInfo.SafetyStock}
            onChange={(e) =>
              handleToolSpecInfoInput("SafetyStock", e.target.value)
            }
          />
          <label htmlFor="BladeDiameter">BladeDiameter</label>
          <input
            type="number"
            name="BladeDiameter"
            className="input"
            value={toolSpecInfo.BladeDiameter}
            onChange={(e) =>
              handleToolSpecInfoInput("BladeDiameter", e.target.value)
            }
          />
          <label htmlFor="BladeHeight">BladeHeight</label>
          <input
            type="number"
            name="BladeHeight"
            className="input"
            value={toolSpecInfo.BladeHeight}
            onChange={(e) =>
              handleToolSpecInfoInput("BladeHeight", e.target.value)
            }
          />
          <label htmlFor="TotalLength">TotalLength</label>
          <input
            type="number"
            name="TotalLength"
            className="input"
            value={toolSpecInfo.TotalLength}
            onChange={(e) =>
              handleToolSpecInfoInput("TotalLength", e.target.value)
            }
          />
          <label htmlFor="HandleDiameter">HandleDiameter</label>
          <input
            type="number"
            name="HandleDiameter"
            className="input"
            value={toolSpecInfo.HandleDiameter}
            onChange={(e) =>
              handleToolSpecInfoInput("HandleDiameter", e.target.value)
            }
          />
          <div className="flex ">
            <button
              className="w-full p-1 mx-2 my-4 bg-gray-500 rounded-md hover:bg-gray-700 "
              onClick={(e) => changePage(e, 1)}
            >
              上一步
            </button>
            <button
              className="w-full p-1 mx-2 my-4 bg-indigo-500 rounded-md hover:bg-indigo-700"
              onClick={(e) => changePage(e, 3)}
            >
              下一步
            </button>
          </div>
        </div>
        <div className={` ${newToolSpecPage === 3 ? "block" : "hidden"}`}>
          <p className="text-center ">○○●</p>
          <label htmlFor="ProcessCnt">ProcessCnt</label>
          <input
            type="number"
            name="ProcessCnt"
            className="input"
            value={toolSpecInfo.ProcessCnt}
            onChange={(e) =>
              handleToolSpecInfoInput("ProcessCnt", e.target.value)
            }
          />
          <label htmlFor="ProcessTime">ProcessTime</label>
          <input
            type="number"
            name="ProcessTime"
            className="input"
            value={toolSpecInfo.ProcessTime}
            onChange={(e) =>
              handleToolSpecInfoInput("ProcessTime", e.target.value)
            }
          />
          <label htmlFor="ProcessLength">ProcessLength</label>
          <input
            type="number"
            name="ProcessLength"
            className="input"
            value={toolSpecInfo.ProcessLength}
            onChange={(e) =>
              handleToolSpecInfoInput("ProcessLength", e.target.value)
            }
          />
          <label htmlFor="RepairCnt">RepairCnt</label>
          <input
            type="number"
            name="RepairCnt"
            className="input"
            value={toolSpecInfo.RepairCnt}
            onChange={(e) =>
              handleToolSpecInfoInput("RepairCnt", e.target.value)
            }
          />
          <div className="flex">
            <button
              className="w-full p-1 mx-2 my-4 bg-gray-500 rounded-md hover:bg-gray-700"
              onClick={(e) => changePage(e, 2)}
            >
              上一步
            </button>

            <input
              className="w-full p-1 mx-2 my-4 bg-indigo-500 rounded-md hover:bg-indigo-700"
              type="submit"
            />
          </div>
        </div>
      </form>
    </>
  );
}
