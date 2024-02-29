"use client";

import { apiNewMachineSpec } from "@/scripts/apis/machine-spec";
import { apiGetMachineTypeList } from "@/scripts/apis/machine-type";
import { apiGetProductLineList } from "@/scripts/apis/product-line";
import { FormEvent, useEffect, useState } from "react";

interface MachineSpecNewProps {
  fetchGetMachineSpecList: () => void;
}

export default function MachineSpecNew({
  fetchGetMachineSpecList,
}: MachineSpecNewProps) {
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
  const [page, setPage] = useState(1);

  const fetchGetProductLineList = async () => {
    const res = await apiGetProductLineList();
    const reqInt = res?.data?.Values?.ReqInt;

    if (reqInt === 0) {
      setProductLineList(res.data.Values.ProductLineList);
    }
  };

  const fetchGetMachineType = async () => {
    const res = await apiGetMachineTypeList();
    const reqInt = res?.data?.Values?.ReqInt;

    if (reqInt === 0) {
      setMachineTypeList(res.data.Values.MachineTypeList);
    }
  };

  const fetchAddMachineSpec = async (e: FormEvent) => {
    e.preventDefault();
    const res = await apiNewMachineSpec(newMachineSpec);
    const reqInt = res?.data?.Values?.ReqInt;
    console.log(res);

    if (reqInt === 0) {
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
      setPage(1);
      fetchGetMachineSpecList();
    }
  };

  const handleNewInput = (name: string, value: string | number | boolean) => {
    if (name === "IsSpindle") {
      console.log(value);
      return;
    }
    setNewMachineSpec((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePage = (e: FormEvent, value: number) => {
    e.preventDefault();
    if (page === 3) {
      return;
    }
    setPage((prev) => prev + value);
  };

  useEffect(() => {
    fetchGetProductLineList();
    fetchGetMachineType();
  }, []);

  return (
    <div className="p-2 my-4 border-t-2 border-b-2">
      <p className="text-xl text-center">New Machine Spec</p>
      <form onSubmit={(e) => fetchAddMachineSpec(e)}>
        <div className={page === 1 ? "block" : "hidden"}>
          <p className="text-sm text-center ">●○○</p>
          <div className="my-2">
            <label htmlFor="ProductLineId">ProductLineId</label>
            <select
              name="ProductLineId"
              className="text-black input"
              value={newMachineSpec.ProductLineId}
              onChange={(e) => handleNewInput("ProductLineId", e.target.value)}
            >
              <option value="" className="text-black ">
                請選擇
              </option>
              {productLineList.map((item) => (
                <option value={item.Id} key={item.Id} className="text-black ">
                  {item.Name}
                </option>
              ))}
            </select>
          </div>
          <div className="my-2">
            <label htmlFor="MachineTypeId">MachineTypeId</label>
            <select
              name="MachineTypeId"
              className="text-black input"
              value={newMachineSpec.MachineTypeId}
              onChange={(e) => handleNewInput("MachineTypeId", e.target.value)}
            >
              <option value="" className="text-black">
                請選擇
              </option>
              {machineTypeList.map((item) => (
                <option value={item.Id} key={item.Id} className="text-black">
                  {item.Name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="Name">Name</label>
            <input
              id="Name"
              type="text"
              className="input"
              placeholder="Name"
              value={newMachineSpec.Name}
              onChange={(e) => handleNewInput("Name", e.target.value)}
            />
          </div>
          <button
            className="w-full p-1 my-4 bg-indigo-500 rounded-md hover:bg-indigo-700"
            onClick={(e) => handlePage(e, 1)}
          >
            下一步
          </button>
        </div>

        <div className={page === 2 ? "block" : "hidden"}>
          <p className="text-sm text-center ">○●○</p>

          <div className="my-2">
            <label htmlFor="MachineIP">MachineIP</label>
            <input
              id="MachineIP"
              type="text"
              className="input"
              placeholder="MachineIP"
              value={newMachineSpec.MachineIP}
              onChange={(e) => handleNewInput("MachineIP", e.target.value)}
            />
          </div>
          <div className="my-2">
            <label htmlFor="SerialNumber">SerialNumber</label>
            <input
              id="SerialNumber"
              type="text"
              className=" input"
              placeholder="SerialNumber"
              value={newMachineSpec.SerialNumber}
              onChange={(e) => handleNewInput("SerialNumber", e.target.value)}
            />
          </div>
          <div className="my-2">
            <label htmlFor="ReaderID">ReaderID</label>
            <input
              id="ReaderID"
              type="text"
              className=" input"
              placeholder="ReaderID"
              value={newMachineSpec.ReaderId}
              onChange={(e) => handleNewInput("ReaderId", e.target.value)}
            />
          </div>
          <div className="my-2">
            <label htmlFor="Brand">Brand</label>
            <input
              id="Brand"
              type="text"
              className=" input"
              placeholder="Brand"
              value={newMachineSpec.Brand}
              onChange={(e) => handleNewInput("Brand", e.target.value)}
            />
          </div>
          <div className="flex ">
            <button
              className="w-full p-1 mx-1 my-2 bg-gray-500 rounded-md hover:bg-gray-700"
              onClick={(e) => handlePage(e, -1)}
            >
              上一步
            </button>
            <button
              className="w-full p-1 mx-1 my-2 bg-indigo-500 rounded-md hover:bg-indigo-700 "
              onClick={(e) => handlePage(e, 1)}
            >
              下一步
            </button>
          </div>
        </div>

        <div className={page === 3 ? "block" : "hidden"}>
          <p className="text-sm text-center ">○○●</p>
          <div>
            <label htmlFor="Series">Series</label>
            <input
              id="Series"
              type="text"
              className="my-2 input"
              placeholder="Series"
              value={newMachineSpec.Series}
              onChange={(e) => handleNewInput("Series", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="MT">MT</label>
            <input
              id="MT"
              type="text"
              className="my-2 input"
              placeholder="MT"
              value={newMachineSpec.MT}
              onChange={(e) => handleNewInput("MT", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="AxisIndex">AxisIndex</label>
            <input
              id="AxisIndex"
              type="text"
              className="my-2 input"
              placeholder="AxisIndex"
              value={newMachineSpec.AxisIndex}
              onChange={(e) => handleNewInput("AxisIndex", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="AxisName">AxisName</label>
            <input
              id="AxisName"
              type="text"
              className="my-2 input"
              placeholder="AxisName"
              value={newMachineSpec.AxisName}
              onChange={(e) => handleNewInput("AxisName", e.target.value)}
            />
          </div>
          <div>
            <input
              type="checkbox"
              id="IsSpindle"
              defaultChecked={newMachineSpec.IsSpindle}
              onChange={(e) => handleNewInput("IsSpindle", e.target.checked)}
            />
            <label htmlFor="IsSpindle" className="">
              IsSpindle
            </label>
          </div>
          <div className="flex">
            <button
              className="w-full p-1 mx-1 my-2 bg-gray-500 rounded-md hover:bg-gray-700"
              onClick={(e) => handlePage(e, -1)}
            >
              上一步
            </button>
            <button className="w-full p-1 mx-1 my-2 bg-indigo-500 rounded-md hover:bg-indigo-700 ">
              送出
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
