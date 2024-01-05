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

interface EditStepOneProps {
  machineSpec: MachineSpecItem;
  setMachineSpec: React.Dispatch<React.SetStateAction<MachineSpecItem>>;
  nextPage: () => void;
}

const EditStepOne = ({
  machineSpec,
  setMachineSpec,
  nextPage,
}: EditStepOneProps) => {
  return (
    <div>
      <p>●○○</p>
      <label htmlFor="ProductLineID">生產線ID</label>
      <input
        id="ProductLineID"
        type="text"
        value={machineSpec.ProductLineID}
        className="block pl-2 mx-auto mb-2 text-gray-300 rounded-md min-h-10 min-w-72"
        readOnly
      />
      <label htmlFor="MachineTypeID">設備類型ID</label>
      <input
        id="MachineTypeID"
        type="text"
        value={machineSpec.MachineTypeID}
        className="block pl-2 mx-auto mb-2 text-gray-300 rounded-md min-h-10 min-w-72"
        readOnly
      />
      <label htmlFor="MachineSN">設備SN序號</label>
      <input
        id="MachineSN"
        type="text"
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
        value={machineSpec.MachineName}
        className="block pl-2 mx-auto mb-2 text-black rounded-md min-h-10 min-w-72"
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

export default EditStepOne;
