"use client";

import {
  apiDeleteMachineSpec,
  apiEditMachineSpec,
} from "@/scripts/Apis/machineSpec/machineSpec";
import { apiGetMachineTypeList } from "@/scripts/Apis/machineType/machineType";
import { apiGetProductLineTypeList } from "@/scripts/Apis/productLineType/productLineType";
import React, { FormEvent, useEffect, useState } from "react";

interface editMachineSpecItem {
  MachineId: string;
  ProductLineId: string;
  MachineTypeId: string;
  SerialNumber: string;
  Name: string;
  MachineIP: string;
  ReaderId: string;
  Brand: number;
  Series: string;
  MT: string;
  AxisIndex: number;
  AxisName: string;
  IsSpindle: boolean;
}

interface EditMachineSpecProps {
  editMachineSpec: editMachineSpecItem;
  setEditMachineSpec: React.Dispatch<React.SetStateAction<editMachineSpecItem>>;
  getMachineSpecList: () => void;
  setEditMachineSpecMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditMachineSpec({
  editMachineSpec,
  setEditMachineSpec,
  getMachineSpecList,
  setEditMachineSpecMode,
}: EditMachineSpecProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [productLineList, setProductLineList] = useState([]);
  const [machineTypeList, setMachineTypeList] = useState([]);

  const getProductLineList = async () => {
    const res: any = await apiGetProductLineTypeList();

    if (res?.data?.Values?.ReqInt === 0) {
      setProductLineList(res.data.Values.ProductLineList);
    }
  };

  const getMachineTypeList = async () => {
    const res: any = await apiGetMachineTypeList();
    if (res?.data?.Values?.ReqInt === 0) {
      setMachineTypeList(res.data.Values.MachineTypeList);
    }
  };
  const patchMachineSpec = async (e: FormEvent) => {
    e.preventDefault();
    const res: any = await apiEditMachineSpec(editMachineSpec);
    console.log(res);
    if (res?.data?.Values?.ReqInt === 0) {
      setCurrentPage(1);
      getMachineSpecList();
      setEditMachineSpecMode(false);
    }
  };

  const handleChangePage = (e: FormEvent, page: number) => {
    e.preventDefault();
    setCurrentPage((prev) => prev + page);
  };

  const handleEditMachineSpec = (key: string, value: string) => {
    setEditMachineSpec((prev) => ({ ...prev, [key]: value }));
  };

  const deleteMachineSpec = async () => {
    const confirm = window.confirm("確定要刪除嗎?");
    if (confirm) {
      const res: any = await apiDeleteMachineSpec(editMachineSpec);
      console.log(res);
      if (res?.data?.Values?.ReqInt === 0) {
        setCurrentPage(1);
        getMachineSpecList();
        setEditMachineSpecMode(false);
      }
    }
  };
  useEffect(() => {
    getProductLineList();
    getMachineTypeList();
  }, []);
  return (
    <div className="p-4 bg-gray-700 rounded-xl">
      <div className="relative">
        <button
          className="absolute top-0 left-0 p-2 border rounded-md hover:bg-gray-600"
          onClick={() => deleteMachineSpec()}
        >
          刪除
        </button>
        <button
          className="absolute top-0 right-0 p-2 "
          onClick={() => setEditMachineSpecMode(false)}
        >
          X
        </button>
        <h3>編輯設備規格</h3>
      </div>
      <form className="max-w-md mx-auto" onSubmit={(e) => patchMachineSpec(e)}>
        {/* part one */}
        <div className={currentPage === 1 ? "block" : "hidden"}>
          <p className="my-2">●○○</p>
          <div className="my-4">
            <label htmlFor="productLineId">生產線</label>
            <select
              id="productLineId"
              className="w-full p-2 text-black rounded-md"
              value={editMachineSpec.ProductLineId}
              onChange={(e) =>
                handleEditMachineSpec("ProductLineId", e.target.value)
              }
            >
              <option value="">請選擇</option>
              {productLineList.map((item: any) => (
                <option key={item.Id} value={item.Id} className="text-black">
                  {item.Name}
                </option>
              ))}
            </select>
          </div>
          <div className="my-4">
            <label htmlFor="machineTypeId">設備類型</label>
            <select
              id="machineTypeId"
              className="w-full p-2 text-black rounded-md"
              value={editMachineSpec.MachineTypeId}
              onChange={(e) =>
                handleEditMachineSpec("MachineTypeId", e.target.value)
              }
            >
              <option value="" className="text-black">
                請選擇
              </option>
              {machineTypeList.map((item: any) => (
                <option key={item.Id} value={item.Id} className="text-black">
                  {item.Name}
                </option>
              ))}
            </select>
          </div>
          <div className="my-4">
            <label htmlFor="serialNumber">設備序號</label>
            <input
              id="serialNumber"
              className="w-full p-2 text-black rounded-md"
              value={editMachineSpec.SerialNumber}
              onChange={(e) =>
                handleEditMachineSpec("SerialNumber", e.target.value)
              }
            />
          </div>
          <div className="my-4">
            <label htmlFor="name">設備名稱</label>
            <input
              id="name"
              className="w-full p-2 text-black rounded-md"
              value={editMachineSpec.Name}
              onChange={(e) => handleEditMachineSpec("Name", e.target.value)}
            />
          </div>
          <button
            className="w-full bg-gray-600 rounded-md hover:bg-gray-500"
            onClick={(e) => handleChangePage(e, 1)}
          >
            下一步
          </button>
        </div>
        {/* part two */}
        <div className={currentPage === 2 ? "block" : "hidden"}>
          <p className="my-2">○●○</p>

          <div className="my-4">
            <label htmlFor="machineIP">設備IP位址</label>
            <input
              id="machineIP"
              className="w-full p-2 text-black rounded-md"
              value={editMachineSpec.MachineIP}
              onChange={(e) =>
                handleEditMachineSpec("MachineIP", e.target.value)
              }
            />
          </div>
          <div className="my-4">
            <label htmlFor="readerId">讀取器ID</label>
            <input
              id="readerId"
              className="w-full p-2 text-black rounded-md"
              value={editMachineSpec.ReaderId}
              onChange={(e) =>
                handleEditMachineSpec("ReaderId", e.target.value)
              }
            />
          </div>
          <div className="my-4">
            <label htmlFor="brand">品牌</label>
            <input
              id="brand"
              className="w-full p-2 text-black rounded-md"
              value={editMachineSpec.Brand}
              onChange={(e) => handleEditMachineSpec("Brand", e.target.value)}
            />
          </div>
          <div className="my-4">
            <label htmlFor="series">系列</label>
            <input
              id="series"
              className="w-full p-2 text-black rounded-md"
              value={editMachineSpec.Series}
              onChange={(e) => handleEditMachineSpec("Series", e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button
              className="w-full bg-gray-800 rounded-md hover:bg-gray-700"
              onClick={(e) => handleChangePage(e, -1)}
            >
              上一步
            </button>
            <button
              className="w-full bg-gray-600 rounded-md hover:bg-gray-500"
              onClick={(e) => handleChangePage(e, 1)}
            >
              下一步
            </button>
          </div>
        </div>
        {/* part three */}
        <div className={currentPage === 3 ? "block" : "hidden"}>
          <p className="my-2">○○●</p>
          <div className="my-4">
            <label htmlFor="mt">MT</label>
            <input
              id="mt"
              className="w-full p-2 text-black rounded-md"
              value={editMachineSpec.MT}
              onChange={(e) => handleEditMachineSpec("MT", e.target.value)}
            />
          </div>
          <div className="my-4">
            <label htmlFor="axisIndex">AxisIndex</label>
            <input
              type="text"
              id="axisIndex"
              className="w-full p-2 text-black rounded-md"
              value={editMachineSpec.AxisIndex}
              onChange={(e) =>
                handleEditMachineSpec("AxisIndex", e.target.value)
              }
            />
          </div>
          <div className="my-4">
            <label htmlFor="axisName">AxisName</label>
            <input
              type="text"
              id="axisName"
              className="w-full p-2 text-black rounded-md"
              value={editMachineSpec.AxisName}
              onChange={(e) =>
                handleEditMachineSpec("AxisName", e.target.value)
              }
            />
          </div>
          <div className="my-4">
            <label htmlFor="isSpindle">IsSpindle</label>
            <input type="checkbox" />
          </div>
          <div className="flex gap-2">
            <button
              className="w-full bg-gray-800 rounded-md hover:bg-gray-600"
              onClick={(e) => handleChangePage(e, -1)}
            >
              上一步
            </button>
            <button className="w-full bg-gray-600 rounded-md hover:bg-gray-500">
              編輯
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
