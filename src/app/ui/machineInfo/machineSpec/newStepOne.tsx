import React from "react";

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

interface ProductLineListItem {
  ProductLineID: string;
  ProductLineName: string;
}

interface MachineTypeListItem {
  MachineTypeID: string;
  MachineTypeName: string;
}

interface NewStepOneProps {
  machineSpec: MachineSpecItem;
  setMachineSpec: React.Dispatch<React.SetStateAction<MachineSpecItem>>;
  productLineList: ProductLineListItem[];
  machineTypeList: MachineTypeListItem[];
  nextPage: () => void;
}

const NewStepOne = ({
  productLineList,
  machineTypeList,
  machineSpec,
  setMachineSpec,
  nextPage,
}: NewStepOneProps) => {
  return (
    <div>
      <p>●○○</p>
      <label htmlFor="ProductLineName">生產線</label>
      <select
        id="ProductLineName"
        defaultValue={""}
        onChange={(e) =>
          setMachineSpec({ ...machineSpec, ProductLineID: e.target.value })
        }
        className="block pl-2 mx-auto mb-2 text-black rounded-md min-h-10 min-w-72"
      >
        <option value="" className="text-black " disabled>
          請選擇生產線
        </option>
        {productLineList &&
          productLineList.map((item, index) => (
            <React.Fragment key={item.ProductLineID}>
              <option value={item.ProductLineID} className="text-black ">
                {item.ProductLineName}
              </option>
            </React.Fragment>
          ))}
      </select>
      <label htmlFor="MachineTypeName">設備</label>
      <select
        id="MachineTypeName"
        defaultValue={""}
        onChange={(e) =>
          setMachineSpec({ ...machineSpec, MachineTypeID: e.target.value })
        }
        className="block pl-2 mx-auto mb-2 text-black rounded-md min-h-10 min-w-72"
      >
        <option value="" className="text-black " disabled>
          請選擇設備
        </option>
        {machineTypeList.map((item, index) => (
          <React.Fragment key={item.MachineTypeID}>
            <option value={item.MachineTypeID} className="text-black ">
              {item.MachineTypeName}
            </option>
          </React.Fragment>
        ))}
      </select>{" "}
      <label htmlFor="MachineSN">設備SN</label>
      <input
        id="MachineSN"
        type="text"
        placeholder="設備SN序號"
        className="block pl-2 mx-auto mb-2 text-black rounded-md min-h-10 min-w-72"
        value={machineSpec.MachineSN}
        onChange={(e) =>
          setMachineSpec({ ...machineSpec, MachineSN: e.target.value })
        }
      />
      <label htmlFor="MachineName">設備名稱</label>
      <input
        id="MachineName"
        type="text"
        placeholder="設備名稱"
        className="block pl-2 mx-auto mb-2 text-black rounded-md min-h-10 min-w-72"
        value={machineSpec.MachineName}
        onChange={(e) =>
          setMachineSpec({ ...machineSpec, MachineName: e.target.value })
        }
      />
      <button
        className="p-2 bg-blue-500 rounded-md min-w-72"
        onClick={() => nextPage()}
      >
        下一步
      </button>
    </div>
  );
};
export default NewStepOne;
