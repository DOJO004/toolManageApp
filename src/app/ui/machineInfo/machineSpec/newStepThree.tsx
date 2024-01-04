interface MachineSpecItem {
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
  };
}

interface NewStepThreeProps {
  machineSpec: MachineSpecItem;
  setMachineSpec: React.Dispatch<React.SetStateAction<MachineSpecItem>>;
  prevPage: () => void;
  fetchAddMachineSpecInfo: () => void;
}
const NewStepThree = ({
  machineSpec,
  setMachineSpec,
  prevPage,
  fetchAddMachineSpecInfo,
}: NewStepThreeProps) => {
  return (
    <div>
      <p>○○●</p>
      <input
        type="text"
        placeholder="MT"
        className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
        value={machineSpec.SystemInfo.MT}
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
      <input
        type="number"
        placeholder="AxisIndex"
        className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
        value={machineSpec.AxisInfos.AxisIndex}
        onChange={(e) =>
          setMachineSpec({
            ...machineSpec,
            AxisInfos: {
              ...machineSpec.AxisInfos,
              AxisIndex: e.target.value,
            },
          })
        }
      />
      <input
        type="text"
        placeholder="AxisName"
        className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
        value={machineSpec.AxisInfos.AxisName}
        onChange={(e) =>
          setMachineSpec({
            ...machineSpec,
            AxisInfos: {
              ...machineSpec.AxisInfos,
              AxisName: e.target.value,
            },
          })
        }
      />
      <div className="relative flex items-center mx-auto my-2 bg-white rounded-md w-fit min-w-72">
        <input
          id="IsSpindle"
          type="checkbox"
          placeholder="IsSpindle"
          className="absolute left-2 "
          onChange={(e) =>
            setMachineSpec({
              ...machineSpec,
              AxisInfos: {
                ...machineSpec.AxisInfos,
                IsSpindle: e.target.checked,
              },
            })
          }
        />
        <label htmlFor="IsSpindle" className="w-full text-center text-black">
          IsSpindle?
        </label>
      </div>
      <button
        className="p-2 m-2 bg-blue-500 rounded-md min-w-32"
        onClick={() => prevPage()}
      >
        上一步
      </button>
      <button
        className="p-2 m-2 bg-blue-500 rounded-md min-w-32"
        onClick={() => fetchAddMachineSpecInfo()}
      >
        完成
      </button>
    </div>
  );
};

export default NewStepThree;
