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

interface NewStepTwoProps {
  machineSpec: MachineSpecItem;
  setMachineSpec: React.Dispatch<React.SetStateAction<MachineSpecItem>>;
  nextPage: () => void;
  prevPage: () => void;
}

const NewStepTwo = ({
  machineSpec,
  setMachineSpec,
  nextPage,
  prevPage,
}: NewStepTwoProps) => {
  return (
    <div>
      <p>○●○</p>
      <div>
        <label htmlFor="Brand">品牌</label>
        <input
          id="Brand"
          type="text"
          placeholder="品牌"
          className="block w-full pl-2 mx-auto mb-2 text-black rounded-md min-h-10"
          value={machineSpec.SystemInfo.Brand}
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
      </div>
      <div>
        <label htmlFor="Series">系列</label>
        <input
          id="Series"
          type="text"
          placeholder="系列"
          className="block w-full pl-2 mx-auto mb-2 text-black rounded-md min-h-10"
          value={machineSpec.SystemInfo.Series}
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
      </div>
      <div>
        <label htmlFor="MachineIP">設備IP位址</label>
        <input
          id="MachineIP"
          type="text"
          placeholder="設備IP位址"
          className="block w-full pl-2 mx-auto mb-2 text-black rounded-md min-h-10"
          value={machineSpec.MachineIP}
          onChange={(e) =>
            setMachineSpec({ ...machineSpec, MachineIP: e.target.value })
          }
        />
      </div>
      <div>
        <label htmlFor="ReaderID">讀取器ID</label>
        <input
          id="ReaderID"
          type="text"
          placeholder="讀取器ID"
          className="block w-full pl-2 mx-auto mb-2 text-black rounded-md min-h-10"
          value={machineSpec.ReaderID}
          onChange={(e) =>
            setMachineSpec({ ...machineSpec, ReaderID: e.target.value })
          }
        />
      </div>
      <div className="mt-6">
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
    </div>
  );
};

export default NewStepTwo;
