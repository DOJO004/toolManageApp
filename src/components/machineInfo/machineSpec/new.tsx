"use client";

import { apiNewMachineSpec } from "@/scripts/Apis/machineSpec/machineSpec";
import { apiGetMachineTypeList } from "@/scripts/Apis/machineType/machineType";
import { apiGetProductLineTypeList } from "@/scripts/Apis/productLineType/productLineType";
import React, { FormEvent, useEffect, useState } from "react";
import {
  GetMachineTypeListResponse,
  MachineTypeItem,
} from "../machineType/types";
import {
  GetProductLineListResponse,
  ProductLineItem,
} from "../productLine/types";
import { PostMachineSpecResponse } from "./types";

interface NewMachineSpecProps {
  getMachineSpecList: () => void;
  setNewMachineSpecMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NewMachineSpec({
  getMachineSpecList,
  setNewMachineSpecMode,
}: NewMachineSpecProps) {
  const [newMachineSpec, setNewMachineSpec] = useState({
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
  const [productLineList, setProductLineList] = useState<ProductLineItem[]>([]);
  const [machineTypeList, setMachineTypeList] = useState<MachineTypeItem[]>([]);
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

  const postMachineSpec = async (e: FormEvent) => {
    e.preventDefault();
    const data = await apiNewMachineSpec(newMachineSpec);
    const res = data as PostMachineSpecResponse;
    console.log("new machine spec", res);

    if (res?.data?.Values?.ReqInt === 0) {
      cleanNewMachineSpec();
      getMachineSpecList();
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

  useEffect(() => {
    getProductLineList();
    getMachineTypeList();
  }, []);
  return (
    <div className="p-4 bg-gray-700 rounded-xl">
      <div className="relative ">
        <h3 className="font-bold text-left">新增設備規格</h3>
        <button
          className="absolute top-0 right-0 p-1 rounded-full hover:bg-gray-900 "
          onClick={() => setNewMachineSpecMode(false)}
        >
          X
        </button>
      </div>
      <form onSubmit={(e) => postMachineSpec(e)}>
        <div className="grid grid-cols-12 gap-2 my-4">
          <div className="relative my-4">
            <label className="absolute left-0 -top-6" htmlFor="productLineId">
              生產線
            </label>
            <select
              id="productLineId"
              className="w-full p-2 text-black rounded-md"
              value={newMachineSpec.ProductLineId}
              onChange={(e) =>
                handleNewMachineSpec("ProductLineId", e.target.value)
              }
            >
              <option value="">選擇生產線</option>
              {productLineList.map((item) => (
                <option key={item.Id} value={item.Id} className="text-black">
                  {item.Name}
                </option>
              ))}
            </select>
          </div>
          <div className="relative my-4">
            <label className="absolute left-0 -top-6" htmlFor="machineTypeId">
              設備類型
            </label>
            <select
              id="machineTypeId"
              className="w-full p-2 text-black rounded-md"
              value={newMachineSpec.MachineTypeId}
              onChange={(e) =>
                handleNewMachineSpec("MachineTypeId", e.target.value)
              }
            >
              <option value="" className="text-black">
                選擇設備類型
              </option>
              {machineTypeList.map((item) => (
                <option key={item.Id} value={item.Id} className="text-black">
                  {item.Name}
                </option>
              ))}
            </select>
          </div>
          <div className="relative my-4">
            <label className="absolute left-0 -top-6" htmlFor="serialNumber">
              設備 SN 序號
            </label>
            <input
              id="serialNumber"
              className="w-full p-2 text-black rounded-md"
              value={newMachineSpec.SerialNumber}
              placeholder="設備 SN 序號"
              onChange={(e) =>
                handleNewMachineSpec("SerialNumber", e.target.value)
              }
            />
          </div>
          <div className="relative my-4">
            <label className="absolute left-0 -top-6" htmlFor="name">
              設備名稱
            </label>
            <input
              id="name"
              className="w-full p-2 text-black rounded-md"
              value={newMachineSpec.Name}
              placeholder="設備名稱"
              onChange={(e) => handleNewMachineSpec("Name", e.target.value)}
            />
          </div>

          <div className="relative my-4">
            <label className="absolute left-0 -top-6" htmlFor="machineIP">
              設備 IP 位址
            </label>
            <input
              id="machineIP"
              className="w-full p-2 text-black rounded-md"
              placeholder="設備 IP 位址"
              value={newMachineSpec.MachineIP}
              onChange={(e) =>
                handleNewMachineSpec("MachineIP", e.target.value)
              }
            />
          </div>
          <div className="relative my-4">
            <label className="absolute left-0 -top-6" htmlFor="readerId">
              讀取器 ID
            </label>
            <input
              id="readerId"
              className="w-full p-2 text-black rounded-md"
              placeholder="讀取器 ID"
              value={newMachineSpec.ReaderId}
              onChange={(e) => handleNewMachineSpec("ReaderId", e.target.value)}
            />
          </div>
          <div className="relative my-4">
            <label className="absolute left-0 -top-6" htmlFor="brand">
              品牌
            </label>
            <input
              id="brand"
              className="w-full p-2 text-black rounded-md"
              placeholder="品牌"
              value={newMachineSpec.Brand}
              onChange={(e) => handleNewMachineSpec("Brand", e.target.value)}
            />
          </div>
          <div className="relative my-4">
            <label className="absolute left-0 -top-6" htmlFor="series">
              系列
            </label>
            <input
              id="series"
              className="w-full p-2 text-black rounded-md"
              placeholder="系列"
              value={newMachineSpec.Series}
              onChange={(e) => handleNewMachineSpec("Series", e.target.value)}
            />
          </div>

          <div className="relative my-4">
            <label className="absolute left-0 -top-6" htmlFor="mt">
              MT
            </label>
            <input
              id="mt"
              className="w-full p-2 text-black rounded-md"
              placeholder="MT"
              value={newMachineSpec.MT}
              onChange={(e) => handleNewMachineSpec("MT", e.target.value)}
            />
          </div>
          <div className="relative my-4">
            <label className="absolute left-0 -top-6" htmlFor="axisIndex">
              AxisIndex
            </label>
            <input
              type="text"
              id="axisIndex"
              className="w-full p-2 text-black rounded-md"
              placeholder="AxisIndex"
              value={newMachineSpec.AxisIndex}
              onChange={(e) =>
                handleNewMachineSpec("AxisIndex", e.target.value)
              }
            />
          </div>
          <div className="relative my-4">
            <label className="absolute left-0 -top-6" htmlFor="axisName">
              AxisName
            </label>
            <input
              type="text"
              id="axisName"
              className="w-full p-2 text-black rounded-md"
              placeholder="AxisName"
              value={newMachineSpec.AxisName}
              onChange={(e) => handleNewMachineSpec("AxisName", e.target.value)}
            />
          </div>
          <div className="my-4 ">
            <input
              type="checkbox"
              id="isSpindle"
              checked={newMachineSpec.IsSpindle}
              onChange={(e) =>
                handleNewMachineSpec("IsSpindle", e.target.checked)
              }
            />
            <label htmlFor="isSpindle">IsSpindle</label>
          </div>
        </div>
        <button className="w-full p-1 bg-indigo-500 rounded-md hover:bg-indigo-600">
          新增
        </button>
      </form>
    </div>
  );
}
