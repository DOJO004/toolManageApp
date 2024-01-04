import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";
import { DeleteBtn, BackBtn } from "../../buttons";

interface MachineTypeItem {
  MachineTypeID: string;
  MachineTypeName: string;
}

interface MachineTypeEditProps {
  machineType: MachineTypeItem;
  setMachineType: React.Dispatch<React.SetStateAction<MachineTypeItem>>;
  fetchEditMachineType: (e: FormEvent) => void;
  fetchDeleteMachineType: () => void;
}
const MachineTypeEdit = ({
  machineType,
  setMachineType,
  fetchEditMachineType,
  fetchDeleteMachineType,
}: MachineTypeEditProps) => {
  const router = useRouter();
  return (
    <form
      className="relative flex flex-col justify-center w-full p-4 bg-gray-900 rounded-xl"
      onSubmit={(e) => fetchEditMachineType(e)}
    >
      <p className="text-xl text-center">編輯設備類型</p>
      <input
        type="text"
        value={machineType.MachineTypeID}
        placeholder="設備ID"
        className="block pl-2 mx-auto my-2 text-gray-300 rounded-md min-h-10 min-w-72"
        readOnly
      />
      <input
        type="text"
        value={machineType.MachineTypeName}
        placeholder="設備名稱"
        className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
        onChange={(e) =>
          setMachineType({ ...machineType, MachineTypeName: e.target.value })
        }
      />
      <button className="block p-2 mx-auto bg-blue-500 rounded-md min-w-72">
        完成
      </button>
      <div className="absolute top-2 right-5">
        <DeleteBtn deleteFunction={fetchDeleteMachineType} />
      </div>
      <div className="absolute top-3 left-5">
        <BackBtn backFunction={router.back} />
      </div>
    </form>
  );
};

export default MachineTypeEdit;
