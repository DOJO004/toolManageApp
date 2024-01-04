import React from "react";
import { BackBtn } from "../../buttons";
import { useRouter } from "next/navigation";

interface MachineSpecItem {
  MachineID: string;
  ProductLineID: string;
  MachineTypeID: string;
  MachineSN: string;
  MachineName: string;
  MachineIP: string;
  ReaderID: string;
  SystemInfo: {
    Brand: string;
    Series: string;
    MT: string;
  };
  AxisInfos: {
    AxisIndex: string;
    AxisName: string;
    IsSpindle: boolean;
  }[];
}

interface MachineSpecEditProps {
  machineSpec: MachineSpecItem;
  setMachineSpec: React.Dispatch<React.SetStateAction<MachineSpecItem>>;
  fetchEditMachineSpec: () => void;
}
const MachineSpecEdit = ({
  machineSpec,
  setMachineSpec,
  fetchEditMachineSpec,
}: MachineSpecEditProps) => {
  const router = useRouter();
  return (
    <div className="relative flex flex-col justify-center w-full p-4 text-center bg-gray-900 rounded-xl">
      <p>編輯設備規格</p>
      <label htmlFor="ProductLineID">生產線ID</label>
      <input
        id="ProductLineID"
        type="text"
        value={machineSpec.ProductLineID}
        className="block pl-2 mx-auto my-2 text-gray-300 rounded-md min-h-10 min-w-72"
        readOnly
      />
      <label htmlFor="MachineTypeID">設備類型ID</label>
      <input
        id="MachineTypeID"
        type="text"
        value={machineSpec.MachineTypeID}
        className="block pl-2 mx-auto my-2 text-gray-300 rounded-md min-h-10 min-w-72"
        readOnly
      />
      <label htmlFor="MachineName">設備名稱</label>
      <input
        id="MachineName"
        type="text"
        value={machineSpec.MachineName}
        className="block pl-2 mx-auto my-2 text-gray-300 rounded-md min-h-10 min-w-72"
      />
      <label htmlFor="MachineSN">設備SN序號</label>
      <input
        id="MachineSN"
        type="text"
        className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
        value={machineSpec.MachineSN}
        onChange={(e) =>
          setMachineSpec({ ...machineSpec, MachineSN: e.target.value })
        }
      />
      <label htmlFor="MachineName">設備名稱</label>
      <input
        id="MachineName"
        type="text"
        value={machineSpec.MachineName}
        className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
        onChange={(e) =>
          setMachineSpec({ ...machineSpec, MachineName: e.target.value })
        }
      />
      <label htmlFor="Brand">品牌</label>
      <input
        id="Brand"
        type="text"
        value={machineSpec.SystemInfo.Brand}
        className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
        onChange={(e) =>
          setMachineSpec({
            ...machineSpec,
            SystemInfo: {
              ...machineSpec.SystemInfo,
              Brand: e.target.value,
            },
          })
        }
      />
      <label htmlFor="Series">系列</label>
      <input
        id="Series"
        type="text"
        value={machineSpec.SystemInfo.Series}
        className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
        onChange={(e) =>
          setMachineSpec({
            ...machineSpec,
            SystemInfo: {
              ...machineSpec.SystemInfo,
              Series: e.target.value,
            },
          })
        }
      />
      <label htmlFor="MachineIP">設備IP位址</label>
      <input
        id="MachineIP"
        type="text"
        value={machineSpec.MachineIP}
        className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
        onChange={(e) =>
          setMachineSpec({ ...machineSpec, MachineIP: e.target.value })
        }
      />
      <label htmlFor="ReaderID">讀取器ID</label>
      <input
        id="ReaderID"
        type="text"
        value={machineSpec.ReaderID}
        className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
        onChange={(e) =>
          setMachineSpec({ ...machineSpec, ReaderID: e.target.value })
        }
      />
      <label htmlFor="MT">MT</label>
      <input
        id="MT"
        type="text"
        value={machineSpec.SystemInfo.MT}
        className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
        onChange={(e) =>
          setMachineSpec({
            ...machineSpec,
            SystemInfo: {
              ...machineSpec.SystemInfo,
              MT: e.target.value,
            },
          })
        }
      />
      <label htmlFor="AxisIndex">AxisIndex</label>
      <input
        id="AxisIndex"
        type="text"
        value={machineSpec.AxisInfos[0].AxisIndex}
        className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
        onChange={(e) =>
          setMachineSpec({
            ...machineSpec,
            AxisInfos: [
              {
                ...machineSpec.AxisInfos[0],
                AxisIndex: e.target.value,
              },
            ],
          })
        }
      />
      <label htmlFor="AxisName">AxisName</label>
      <input
        id="AxisName"
        type="text"
        value={machineSpec.AxisInfos[0].AxisName}
        className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
        onChange={(e) =>
          setMachineSpec({
            ...machineSpec,
            AxisInfos: [
              {
                ...machineSpec.AxisInfos[0],
                AxisName: e.target.value,
              },
            ],
          })
        }
      />
      <div className="relative flex items-center mx-auto my-2 bg-white rounded-md w-fit min-w-72">
        <input
          id="IsSpindle"
          type="checkbox"
          checked={machineSpec.AxisInfos[0].IsSpindle}
          className="absolute left-2 "
          onChange={(e) =>
            setMachineSpec({
              ...machineSpec,
              AxisInfos: [
                {
                  ...machineSpec.AxisInfos[0],
                  IsSpindle: e.target.checked,
                },
              ],
            })
          }
        />
        <label htmlFor="IsSpindle" className="w-full text-center text-black">
          IsSpindle?
        </label>
      </div>
      <div>
        <button
          className="p-2 m-2 bg-blue-500 rounded-md min-w-72"
          onClick={() => fetchEditMachineSpec()}
        >
          完成
        </button>
      </div>
      <div className="absolute top-3 left-5">
        <BackBtn backFunction={router.back} />
      </div>
    </div>
  );
};
export default MachineSpecEdit;
