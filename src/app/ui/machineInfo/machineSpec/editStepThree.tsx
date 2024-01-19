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

interface EditStepThreeProps {
  machineSpec: MachineSpecItem;
  setMachineSpec: React.Dispatch<React.SetStateAction<MachineSpecItem>>;
  fetchEditMachineSpec: () => void;
  prevPage: () => void;
}

const EditStepThree = ({
  machineSpec,
  setMachineSpec,
  fetchEditMachineSpec,
  prevPage,
}: EditStepThreeProps) => {
  return (
    <div>
      <p>○○●</p>
      <div>
        <label htmlFor="MT">MT</label>
        <input
          id="MT"
          type="text"
          value={machineSpec.SystemInfo.MT}
          className="w-full pl-2 mx-auto mb-2 text-black rounded-md min-h-10"
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
      </div>
      <div>
        <label htmlFor="AxisIndex">AxisIndex</label>
        <input
          id="AxisIndex"
          type="text"
          value={machineSpec.AxisInfos[0].AxisIndex}
          className="w-full pl-2 mx-auto mb-2 text-black rounded-md min-h-10"
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
      </div>
      <div>
        <label htmlFor="AxisName">AxisName</label>
        <input
          id="AxisName"
          type="text"
          value={machineSpec.AxisInfos[0].AxisName}
          className="w-full pl-2 mx-auto mb-2 text-black rounded-md min-h-10"
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
      </div>
      <div>
        <div className="relative flex items-center w-full h-10 mx-auto my-6 bg-white rounded-md">
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
      </div>
      <div>
        <button
          className="p-2 m-2 bg-blue-500 rounded-md min-w-32"
          onClick={() => prevPage()}
        >
          上一步
        </button>
        <button
          className="p-2 m-2 bg-blue-500 rounded-md min-w-32"
          onClick={() => fetchEditMachineSpec()}
        >
          完成
        </button>
      </div>
    </div>
  );
};

export default EditStepThree;
