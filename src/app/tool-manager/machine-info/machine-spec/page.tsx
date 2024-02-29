"use client";

import MachineSpecNew from "@/app/ui/machineInfo/machineSpec/new";
import { confirmDisable } from "@/scripts/apis/base";
import {
  apiDisabledMachineSpec,
  apiEditMachineSpec,
  apiGetMachineSpecList,
} from "@/scripts/apis/machine-spec";
import { apiGetMachineTypeList } from "@/scripts/apis/machine-type";
import { apiGetProductLineList } from "@/scripts/apis/product-line";
import { useEffect, useState } from "react";

export default function Page() {
  const [machineTypeList, setMachineTypeList] = useState([]);
  const [machineSpecList, setMachineSpecList] = useState([]);
  const [productLineList, setProductLineList] = useState([]);
  const [newToggle, setNewToggle] = useState(false);
  const [editToggle, setEditToggle] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

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

  const fetchGetMachineSpecList = async () => {
    const res = await apiGetMachineSpecList();
    const reqInt = res?.data?.Values?.ReqInt;
    console.log(res);

    if (reqInt === 0) {
      setMachineSpecList(res.data.Values.MachineeSpecList);
    }
  };

  const fetchGetProductLineList = async () => {
    const res = await apiGetProductLineList();
    const reqInt = res?.data?.Values?.ReqInt;

    if (reqInt === 0) {
      setProductLineList(res.data.Values.ProductLineList);
    }
  };

  const fetchGetMachineTypeList = async () => {
    const res = await apiGetMachineTypeList();
    const reqInt = res?.data?.Values?.ReqInt;

    if (reqInt === 0) {
      setMachineTypeList(res.data.Values.MachineTypeList);
    }
  };
  const fetchEditMachineSpec = async () => {
    const res = await apiEditMachineSpec(editMachineSpec);
    const reqInt = res?.data?.Values?.ReqInt;

    if (reqInt === 0) {
      setEditToggle(false);
      fetchGetMachineSpecList();
    }
  };

  const fetchDisabledMachineSpec = async (id: string) => {
    const confirm = confirmDisable();
    if (confirm) {
      const res = await apiDisabledMachineSpec(id);
      const reqInt = res?.data?.Values?.ReqInt;
      console.log(res);

      if (reqInt === 0) {
        fetchGetMachineSpecList();
        setEditToggle(false);
      }
    }
  };

  const handleEditToggle = (index: number, item: object) => {
    setEditIndex(index);
    setEditToggle(true);
    setEditMachineSpec({
      MachineId: item.MachineId,
      ProductLineId: item.ProductLineData.Id,
      MachineTypeId: item.MachineTypeData.Id,
      SerialNumber: item.SerialNumber,
      Name: item.Name,
      MachineIP: item.MachineIP,
      ReaderId: item.ReaderId,
      Brand: item.SystemData.Brand,
      Series: item.SystemData.Series,
      MT: item.SystemData.MT,
      AxisIndex: item.AxisSettingDatas[0].AxisIndex,
      AxisName: item.AxisSettingDatas[0].AxisName,
      IsSpindle: item.AxisSettingDatas[0].IsSpindle,
    });
  };

  const handleEditInput = (name: string, value: string | number | boolean) => {
    setEditMachineSpec((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchGetMachineSpecList();
    fetchGetProductLineList();
    fetchGetMachineTypeList();
  }, []);
  return (
    <div className="w-full p-1 mx-2 bg-gray-900 rounded-md">
      <div className="grid items-center grid-cols-3 gap-2">
        <p className="col-start-2 col-end-2 text-xl text-center ">
          machine spec
        </p>
        <button
          className="p-1 border rounded-md hover:bg-gray-700 w-fit"
          onClick={() => setNewToggle(!newToggle)}
        >
          新增
        </button>
      </div>
      {newToggle && (
        <MachineSpecNew fetchGetMachineSpecList={fetchGetMachineSpecList} />
      )}
      <div className="overflow-auto rounded-t-md">
        <table className="w-full text-center ">
          <thead className="bg-indigo-500 ">
            <tr>
              <th className="p-1">MachineID</th>
              <th className="p-1">ProductLineName</th>
              <th className="p-1">MachineTypeName</th>
              <th className="p-1">SerialNumber</th>
              <th className="p-1">Name</th>
              <th className="p-1">MachineIP</th>
              <th className="p-1">ReaderID</th>
              <th className="p-1">Brand</th>
              <th className="p-1">Series</th>
              <th className="p-1">MT</th>
              <th className="p-1">AxisIndex</th>
              <th className="p-1">AxisName</th>
              <th className="p-1">IsSpindle</th>
              <th className="p-1 whitespace-nowrap">編輯</th>
            </tr>
          </thead>
          <tbody>
            {machineSpecList?.map((item, index) =>
              editToggle && editIndex === index ? (
                <tr key={item.MachineId}>
                  <td>{item.MachineId}</td>
                  <td>
                    <select
                      value={editMachineSpec.ProductLineId}
                      className="text-center input"
                      onChange={(e) =>
                        handleEditInput("ProductLineId", e.target.value)
                      }
                    >
                      {productLineList.map((item) => (
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
                    <select
                      value={editMachineSpec.MachineTypeId}
                      className="text-center input"
                      onChange={(e) =>
                        handleEditInput("MachineTypeId", e.target.value)
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
                      className="text-center input"
                      value={editMachineSpec.SerialNumber}
                      onChange={(e) =>
                        handleEditInput("SerialNumber", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="text-center input"
                      value={editMachineSpec.Name}
                      onChange={(e) => handleEditInput("Name", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="text-center input"
                      value={editMachineSpec.MachineIP}
                      onChange={(e) =>
                        handleEditInput("MachineIP", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="text-center input"
                      value={editMachineSpec.ReaderId}
                      onChange={(e) =>
                        handleEditInput("ReaderId", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="text-center input"
                      value={editMachineSpec.Brand}
                      onChange={(e) => handleEditInput("Brand", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="text-center input"
                      value={editMachineSpec.Series}
                      onChange={(e) =>
                        handleEditInput("Series", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="text-center input"
                      value={editMachineSpec.MT}
                      onChange={(e) => handleEditInput("MT", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="text-center input"
                      value={editMachineSpec.AxisIndex}
                      onChange={(e) =>
                        handleEditInput("AxisIndex", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="text-center input"
                      value={editMachineSpec.AxisName}
                      onChange={(e) =>
                        handleEditInput("AxisName", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      className="text-center input"
                      value={editMachineSpec.IsSpindle}
                      onChange={(e) =>
                        handleEditInput("IsSpindle", e.target.checked)
                      }
                    />
                  </td>
                  <td className=" whitespace-nowrap">
                    <button
                      className="mx-2"
                      onClick={() => fetchEditMachineSpec()}
                    >
                      完成
                    </button>
                    <button
                      className="mx-2"
                      onClick={() => fetchDisabledMachineSpec(item.MachineId)}
                    >
                      刪除
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={item.MachineId}>
                  <td>{item.MachineId}</td>
                  <td>{item.ProductLineData.Name}</td>
                  <td>{item.MachineTypeData.Name}</td>
                  <td>{item.SerialNumber}</td>
                  <td>{item.Name}</td>
                  <td>{item.MachineIP}</td>
                  <td>{item.ReaderId}</td>
                  <td>{item.SystemData.Brand}</td>
                  <td>{item.SystemData.Series}</td>
                  <td>{item.SystemData.MT}</td>
                  <td>{item.AxisSettingDatas[0].AxisIndex} </td>
                  <td>{item.AxisSettingDatas[0].AxisName} </td>
                  <td>{item.AxisSettingDatas[0].IsSpindle.toString()} </td>
                  <td
                    className=" whitespace-nowrap"
                    onClick={() => handleEditToggle(index, item)}
                  >
                    編輯
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
