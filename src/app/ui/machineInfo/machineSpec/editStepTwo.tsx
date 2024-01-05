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

interface EditStepTwoProps {
  machineSpec: MachineSpecItem;
  setMachineSpec: React.Dispatch<React.SetStateAction<MachineSpecItem>>;
  nextPage: () => void;
  prevPage: () => void;
}

const EditStepTwo = ({
  machineSpec,
  setMachineSpec,
  nextPage,
  prevPage,
}: EditStepTwoProps) => {
  return (
    <div>
      <p>○●○</p>

      <label htmlFor="Brand">品牌</label>
      <input
        id="Brand"
        type="text"
        value={machineSpec.SystemInfo.Brand}
        className="block pl-2 mx-auto mb-2 text-black rounded-md min-h-10 min-w-72"
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
        className="block pl-2 mx-auto mb-2 text-black rounded-md min-h-10 min-w-72"
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
        className="block pl-2 mx-auto mb-2 text-black rounded-md min-h-10 min-w-72"
        onChange={(e) =>
          setMachineSpec({ ...machineSpec, MachineIP: e.target.value })
        }
      />
      <label htmlFor="ReaderID">讀取器ID</label>
      <input
        id="ReaderID"
        type="text"
        value={machineSpec.ReaderID}
        className="block pl-2 mx-auto mb-2 text-black rounded-md min-h-10 min-w-72"
        onChange={(e) =>
          setMachineSpec({ ...machineSpec, ReaderID: e.target.value })
        }
      />
      <button
        className="p-2 m-2 bg-blue-500 rounded-md min-w-32"
        onClick={() => prevPage()}
      >
        上一步
      </button>
      <button
        className="p-2 m-2 bg-blue-500 rounded-md min-w-32"
        onClick={() => nextPage()}
      >
        下一步
      </button>
    </div>
  );
};
export default EditStepTwo;
