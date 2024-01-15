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
    <div className="relative p-1 overflow-auto text-center bg-gray-900 rounded-md">
      <p className="text-xl">設備規格</p>
      <div className="mt-2 overflow-hidden rounded-t-lg">
        <table className="border-collapse ">
          <thead className="">
            <tr className="bg-indigo-200 ">
              <th className="p-1 text-black ">生產線</th>
              <th className="p-1 text-black ">設備ID</th>
              <th className="p-1 text-black ">設備SN序號</th>
              <th className="p-1 text-black ">設備名稱</th>
              <th className="p-1 text-black ">品牌</th>
              <th className="p-1 text-black ">系列</th>
              <th className="p-1 text-black ">設備IP位址</th>
              <th className="p-1 text-black ">讀取器ID</th>
              <th className="p-1 text-black ">MT</th>
              <th className="p-1 text-black ">編輯</th>
            </tr>
          </thead>
          <tbody>
            {machineSpecList.map((item, index) => (
              <tr
                key={item.MachineID}
                className=" hover:bg-indigo-500 even:bg-gray-700"
              >
                <td className="p-1 ">{item.ProductLineID.split(":")[1]}</td>
                <td className="p-1 ">{item.MachineID}</td>
                <td className="p-1 ">{item.MachineSN}</td>
                <td className="p-1 ">{item.MachineName}</td>
                <td className="p-1 ">{item.SystemInfo.Brand}</td>
                <td className="p-1 ">{item.SystemInfo.Series}</td>
                <td className="p-1 ">{item.MachineIP}</td>
                <td className="p-1 ">{item.ReaderID}</td>
                <td className="p-1 ">{item.SystemInfo.MT}</td>
                <td
                  className="cursor-pointer "
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
