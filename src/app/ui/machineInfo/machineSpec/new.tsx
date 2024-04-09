"use client";

import { apiNewMachineSpec } from "@/scripts/Apis/machineSpec/machineSpec";
import { apiGetMachineTypeList } from "@/scripts/Apis/machineType/machineType";
import { apiGetProductLineTypeList } from "@/scripts/Apis/productLineType/productLineType";
import { FormEvent, useEffect, useState } from "react";

interface NewMachineSpecProps {
  getMachineSpecList: () => void;
}

export default function NewMachineSpec({
  getMachineSpecList,
}: NewMachineSpecProps) {
  const [newMachineSpec, setNewMachineSpec] = useState({
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
  const [productLineList, setProductLineList] = useState([]);
  const [machineTypeList, setMachineTypeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const getProductLineList = async () => {
    const res = await apiGetProductLineTypeList();

    if (res?.data?.Values?.ReqInt === 0) {
      setProductLineList(res.data.Values.ProductLineList);
    }
  };

  const getMachineTypeList = async () => {
    const res = await apiGetMachineTypeList();
    if (res?.data?.Values?.ReqInt === 0) {
      setMachineTypeList(res.data.Values.MachineTypeList);
    }
  };

  const postMachineSpec = async (e: FormEvent) => {
    e.preventDefault();
    const res = await apiNewMachineSpec(newMachineSpec);
    console.log(res);
    if (res?.data?.Values?.ReqInt === 0) {
      setCurrentPage(1);
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
      Brand: 0,
      Series: "",
      MT: "",
      AxisIndex: 0,
      AxisName: "",
      IsSpindle: false,
    });
  };

  const handleNewMachineSpec = (key: string, value: string | number) => {
    setNewMachineSpec((prev) => ({ ...prev, [key]: value }));
  };

  const handleChangePage = (e: FormEvent, page: number) => {
    e.preventDefault();
    setCurrentPage((prev) => prev + page);
  };

  useEffect(() => {
    getProductLineList();
    getMachineTypeList();
  }, []);
  return (
    <div>
      <h3>新增設備規格</h3>
      <form className="max-w-md mx-auto" onSubmit={(e) => postMachineSpec(e)}>
        {/* part one */}
        <div className={currentPage === 1 ? "block" : "hidden"}>
          <p className="my-2">●○○</p>
          <div className="my-4">
            <label htmlFor="productLineId">生產線</label>
            <select
              id="productLineId"
              className="w-full p-2 text-black rounded-md"
              value={newMachineSpec.ProductLineId}
              onChange={(e) =>
                handleNewMachineSpec("ProductLineId", e.target.value)
              }
            >
              <option value="">請選擇</option>
              {productLineList.map((item) => (
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
              value={newMachineSpec.MachineTypeId}
              onChange={(e) =>
                handleNewMachineSpec("MachineTypeId", e.target.value)
              }
            >
              <option value="" className="text-black">
                請選擇
              </option>
              {machineTypeList.map((item) => (
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
              value={newMachineSpec.SerialNumber}
              onChange={(e) =>
                handleNewMachineSpec("SerialNumber", e.target.value)
              }
            />
          </div>
          <div className="my-4">
            <label htmlFor="name">設備名稱</label>
            <input
              id="name"
              className="w-full p-2 text-black rounded-md"
              value={newMachineSpec.Name}
              onChange={(e) => handleNewMachineSpec("Name", e.target.value)}
            />
          </div>
          <button
            className="w-full bg-gray-700 rounded-md hover:bg-gray-500"
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
              value={newMachineSpec.MachineIP}
              onChange={(e) =>
                handleNewMachineSpec("MachineIP", e.target.value)
              }
            />
          </div>
          <div className="my-4">
            <label htmlFor="readerId">讀取器ID</label>
            <input
              id="readerId"
              className="w-full p-2 text-black rounded-md"
              value={newMachineSpec.ReaderId}
              onChange={(e) => handleNewMachineSpec("ReaderId", e.target.value)}
            />
          </div>
          <div className="my-4">
            <label htmlFor="brand">品牌</label>
            <input
              id="brand"
              className="w-full p-2 text-black rounded-md"
              value={newMachineSpec.Brand}
              onChange={(e) => handleNewMachineSpec("Brand", e.target.value)}
            />
          </div>
          <div className="my-4">
            <label htmlFor="series">系列</label>
            <input
              id="series"
              className="w-full p-2 text-black rounded-md"
              value={newMachineSpec.Series}
              onChange={(e) => handleNewMachineSpec("Series", e.target.value)}
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
              className="w-full bg-gray-700 rounded-md hover:bg-gray-500"
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
              value={newMachineSpec.MT}
              onChange={(e) => handleNewMachineSpec("MT", e.target.value)}
            />
          </div>
          <div className="my-4">
            <label htmlFor="axisIndex">AxisIndex</label>
            <input
              type="text"
              id="axisIndex"
              className="w-full p-2 text-black rounded-md"
              value={newMachineSpec.AxisIndex}
              onChange={(e) =>
                handleNewMachineSpec("AxisIndex", e.target.value)
              }
            />
          </div>
          <div className="my-4">
            <label htmlFor="axisName">AxisName</label>
            <input
              type="text"
              id="axisName"
              className="w-full p-2 text-black rounded-md"
              value={newMachineSpec.AxisName}
              onChange={(e) => handleNewMachineSpec("AxisName", e.target.value)}
            />
          </div>
          <div className="my-4">
            <label htmlFor="isSpindle">IsSpindle</label>
            <input type="checkbox" />
          </div>
          <div className="flex gap-2">
            <button
              className="w-full bg-gray-800 rounded-md hover:bg-gray-700"
              onClick={(e) => handleChangePage(e, -1)}
            >
              上一步
            </button>
            <button className="w-full bg-gray-700 rounded-md hover:bg-gray-500">
              新增
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
