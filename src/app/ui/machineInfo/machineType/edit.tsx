import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";
import { DeleteBtn, BackBtn, CloseBtn } from "../../buttons";

interface MachineTypeItem {
  MachineTypeID: string;
  MachineTypeName: string;
}

interface MachineTypeEditProps {
  machineType: MachineTypeItem;
  setMachineType: React.Dispatch<React.SetStateAction<MachineTypeItem>>;
  fetchEditMachineType: (e: FormEvent) => void;
  fetchDeleteMachineType: () => void;
  changeEditMode: () => void;
}
const MachineTypeEdit = ({
  machineType,
  setMachineType,
  fetchEditMachineType,
  fetchDeleteMachineType,
  changeEditMode,
}: MachineTypeEditProps) => {
  const router = useRouter();
  return (
    <div className="relative w-full m-4 mb-2 max-w-96">
      <form
        className="flex flex-col justify-center w-full p-4 text-center bg-gray-900 border-2 rounded-xl "
        onSubmit={(e) => fetchEditMachineType(e)}
      >
        <p className="text-xl text-center">編輯設備類型</p>
        <hr className="my-4" />
        <div>
          <label htmlFor="MachineTypeID">ID</label>
          <input
            id="MachineTypeID"
            type="text"
            value={machineType.MachineTypeID}
            placeholder="設備ID"
            className="block w-full pl-2 mx-auto my-2 text-gray-300 rounded-md min-h-10"
            readOnly
          />
        </div>
        <div>
          <label htmlFor="MachineTypeName">名稱</label>
          <input
            id="MachineTypeName"
            type="text"
            value={machineType.MachineTypeName}
            placeholder="設備名稱"
            className="block w-full pl-2 mx-auto my-2 text-black rounded-md min-h-10"
            onChange={(e) =>
              setMachineType({
                ...machineType,
                MachineTypeName: e.target.value,
              })
            }
          />
        </div>
        <button className="block w-full p-2 mx-auto mt-4 bg-blue-500 rounded-md">
          完成
        </button>
      </form>
      <div className="absolute top-2 left-5">
        <DeleteBtn deleteFunction={fetchDeleteMachineType} />
      </div>
      <div className="absolute top-3 right-5">
        <CloseBtn changeMode={changeEditMode} />
      </div>
    </div>
  );
};

export default MachineTypeEdit;
