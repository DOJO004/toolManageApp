import React from "react";
import { AddBtn } from "../../buttons";

interface MachineSpecListItem {
  MachineID: string;
  ProductLineID: string;
  MachineTypeID: string;
  MachineSN: string;
  MachineName: string;
  MachineIP: string;
  ReaderID: string;
  SystemInfo: {
    Brand: number;
    Series: string;
    MT: string;
  };
  AxisInfos: [
    {
      AxisIndex: number;
      AxisName: string;
      IsSpindle: boolean;
    },
  ];
}

interface MachineSpecIndexProps {
  machineSpecList: MachineSpecListItem[];
  changeNewMode: () => void;
  changeEditMode: (index: number) => void;
  fetchGetMachineSpecList: (index: number) => void;
}

const MachineSpecIndex = ({
  machineSpecList,
  changeNewMode,
  changeEditMode,
  fetchGetMachineSpecList,
}: MachineSpecIndexProps) => {
  return (
    <div className="relative w-full p-1 text-center ">
      <p className="">設備規格</p>
      <hr className="my-4" />
      <div className="mt-2 overflow-auto rounded-t-lg">
        <table className="w-full ">
          <thead className="">
            <tr className="bg-indigo-500 ">
              <th className="p-1 text-black whitespace-nowrap ">生產線</th>
              <th className="p-1 text-black whitespace-nowrap ">設備ID</th>
              <th className="p-1 text-black whitespace-nowrap ">設備SN序號</th>
              <th className="p-1 text-black whitespace-nowrap ">設備名稱</th>
              <th className="p-1 text-black whitespace-nowrap ">品牌</th>
              <th className="p-1 text-black whitespace-nowrap ">系列</th>
              <th className="p-1 text-black whitespace-nowrap ">設備IP位址</th>
              <th className="p-1 text-black whitespace-nowrap ">讀取器ID</th>
              <th className="p-1 text-black whitespace-nowrap ">MT</th>
              <th className="p-1 text-black whitespace-nowrap ">編輯</th>
            </tr>
          </thead>
          <tbody>
            {machineSpecList.map((item, index) => (
              <tr
                key={item.MachineID}
                className=" hover:bg-indigo-500 even:bg-gray-700"
              >
                <td className="p-1 whitespace-nowrap ">
                  {item.ProductLineID.split(":")[1]}
                </td>
                <td className="p-1 whitespace-nowrap ">{item.MachineID}</td>
                <td className="p-1 whitespace-nowrap ">{item.MachineSN}</td>
                <td className="p-1 whitespace-nowrap ">{item.MachineName}</td>
                <td className="p-1 whitespace-nowrap ">
                  {item.SystemInfo.Brand}
                </td>
                <td className="p-1 whitespace-nowrap ">
                  {item.SystemInfo.Series}
                </td>
                <td className="p-1 whitespace-nowrap ">{item.MachineIP}</td>
                <td className="p-1 whitespace-nowrap ">{item.ReaderID}</td>
                <td className="p-1 whitespace-nowrap ">{item.SystemInfo.MT}</td>
                <td
                  className="cursor-pointer whitespace-nowrap "
                  onClick={() => {
                    changeEditMode(index), fetchGetMachineSpecList(index);
                  }}
                >
                  編輯
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="absolute top-2 right-3">
        <AddBtn changeNewMode={changeNewMode} />
      </div>
    </div>
  );
};

export default MachineSpecIndex;
