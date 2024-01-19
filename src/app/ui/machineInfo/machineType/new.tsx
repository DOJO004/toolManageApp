import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";
import { BackBtn, CloseBtn } from "../../buttons";

interface MachineTypeNewProps {
  machineTypeID: string;
  setMachineTypeID: React.Dispatch<React.SetStateAction<string>>;
  machineTypeName: string;
  setMachineTypeName: React.Dispatch<React.SetStateAction<string>>;
  fetchAddMachineType: (e: FormEvent) => void;
  changeNewMode: () => void;
}
const MachineTypeNew = ({
  machineTypeID,
  machineTypeName,
  setMachineTypeID,
  setMachineTypeName,
  changeNewMode,
  fetchAddMachineType,
}: MachineTypeNewProps) => {
  const router = useRouter();
  return (
    <div className="relative w-full m-4 mb-2 max-w-96">
      <form
        className="flex flex-col justify-center w-full p-4 text-center bg-gray-900 border-2 rounded-xl"
        onSubmit={(e) => fetchAddMachineType(e)}
      >
        <p className="text-xl text-center ">新增設備類型</p>
        <hr className="my-4" />
        <div>
          <label htmlFor="machine-type-id">設備ID</label>
          <input
            id="machine-type-id"
            type="text"
            value={machineTypeID}
            placeholder="設備ID"
            className="block w-full pl-2 mx-auto my-2 text-black rounded-md min-h-10"
            onChange={(e) => setMachineTypeID(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="machine-type-name">設備名稱</label>
          <input
            id="machine-type-name"
            type="text"
            value={machineTypeName}
            placeholder="設備名稱"
            className="block w-full pl-2 mx-auto my-2 text-black rounded-md min-h-10"
            onChange={(e) => setMachineTypeName(e.target.value)}
          />
        </div>
        <button className="block w-full p-2 mx-auto mt-6 bg-blue-500 rounded-md">
          完成
        </button>
      </form>
      <div className="absolute top-3 right-5">
        <CloseBtn changeMode={changeNewMode} />
      </div>
    </div>
  );
};

export default MachineTypeNew;
