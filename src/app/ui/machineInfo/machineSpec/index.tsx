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
    <div className="relative w-full p-2 text-center bg-gray-900 max-w-7xl rounded-xl">
      <p className="text-xl text-center ">設備規格</p>
      <div className="grid grid-cols-10 gap-2 bg-gray-800 1 rounded-xl">
        <div className="truncate ">生產線</div>
        <div className="truncate ">設備ID</div>
        <div className="truncate ">設備SN序號</div>
        <div className="truncate ">設備名稱</div>
        <div className="truncate ">品牌</div>
        <div className="truncate ">系列</div>
        <div className="truncate ">設備IP位址</div>
        <div className="truncate ">讀取器ID</div>
        <div className="truncate ">MT</div>
        <div className="truncate ">編輯</div>
      </div>
      <div className="grid grid-cols-10 gap-2 ">
        {machineSpecList.map((item, index) => (
          <React.Fragment key={item.MachineID}>
            <div className="truncate ">{item.ProductLineID.split(":")[1]}</div>
            <div className="truncate ">{item.MachineID}</div>
            <div className="truncate ">{item.MachineSN}</div>
            <div className="truncate ">{item.MachineName}</div>
            <div className="truncate ">{item.SystemInfo.Brand}</div>
            <div className="truncate ">{item.SystemInfo.Series}</div>
            <div className="truncate ">{item.MachineIP}</div>
            <div className="truncate ">{item.ReaderID}</div>
            <div className="truncate ">{item.SystemInfo.MT}</div>
            <button
              onClick={() => {
                changeEditMode(index), fetchGetMachineSpecList(index);
              }}
            >
              編輯
            </button>
          </React.Fragment>
        ))}
      </div>
      <div className="absolute top-2 right-3">
        <AddBtn changeNewMode={changeNewMode} />
      </div>
    </div>
  );
};

export default MachineSpecIndex;
