import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";
import Notice from "../../notice";
import { BackBtn, CloseBtn } from "../../buttons";

interface MachineTypeNewProps {
  machineTypeID: string;
  setMachineTypeID: React.Dispatch<React.SetStateAction<string>>;
  machineTypeName: string;
  setMachineTypeName: React.Dispatch<React.SetStateAction<string>>;
  fetchAddMachineType: (e: FormEvent) => void;
  changeNewMode: () => void;
  notice: boolean;
  isError: boolean;
}
const MachineTypeNew = ({
  machineTypeID,
  machineTypeName,
  setMachineTypeID,
  setMachineTypeName,
  changeNewMode,
  fetchAddMachineType,
  notice,
  isError,
}: MachineTypeNewProps) => {
  const router = useRouter();
  return (
    <div className="relative mb-2">
      <form
        className="flex flex-col justify-center w-full p-4 text-center bg-gray-900 rounded-xl"
        onSubmit={(e) => fetchAddMachineType(e)}
      >
        <p className="text-xl text-center ">新增設備類型</p>
        {notice && <Notice isError={isError} />}
        <input
          type="text"
          value={machineTypeID}
          placeholder="設備ID"
          className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
          onChange={(e) => setMachineTypeID(e.target.value)}
        />
        <input
          type="text"
          value={machineTypeName}
          placeholder="設備名稱"
          className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
          onChange={(e) => setMachineTypeName(e.target.value)}
        />
        <button className="block p-2 mx-auto bg-blue-500 rounded-md min-w-72">
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
