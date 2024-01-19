import React from "react";
import { BackBtn, CloseBtn, DeleteBtn } from "../../buttons";
import { useRouter } from "next/navigation";
import EditStepOne from "./editStepOne";
import EditStepTwo from "./editStepTwo";
import EditStepThree from "./editStepThree";
import Notice from "../../notice";

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

interface MachineSpecEditProps {
  machineSpec: MachineSpecItem;
  setMachineSpec: React.Dispatch<React.SetStateAction<MachineSpecItem>>;
  fetchEditMachineSpec: () => void;
  nextPage: () => void;
  prevPage: () => void;
  changeEditMode: () => void;
  fetchDeleteMachineSpec: () => void;
  currentPage: number;
  notice: boolean;
  isError: boolean;
}
const MachineSpecEdit = ({
  machineSpec,
  setMachineSpec,
  fetchEditMachineSpec,
  fetchDeleteMachineSpec,
  currentPage,
  nextPage,
  prevPage,
  changeEditMode,
  notice,
  isError,
}: MachineSpecEditProps) => {
  const router = useRouter();
  return (
    <div className="relative flex flex-col w-full p-4 mx-auto mb-2 text-center bg-gray-900 border-2 max-w-96 rounded-xl">
      <p className="text-xl">編輯設備規格</p>
      {notice && <Notice isError={isError} />}
      {currentPage === 1 && (
        <EditStepOne
          machineSpec={machineSpec}
          setMachineSpec={setMachineSpec}
          nextPage={nextPage}
        />
      )}
      {currentPage === 2 && (
        <EditStepTwo
          machineSpec={machineSpec}
          setMachineSpec={setMachineSpec}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      )}
      {currentPage === 3 && (
        <EditStepThree
          machineSpec={machineSpec}
          setMachineSpec={setMachineSpec}
          fetchEditMachineSpec={fetchEditMachineSpec}
          prevPage={prevPage}
        />
      )}
      <div className="absolute top-3 right-3">
        <CloseBtn changeMode={changeEditMode} />
      </div>
      <div className="absolute top-3 left-3">
        <DeleteBtn deleteFunction={fetchDeleteMachineSpec} />
      </div>
    </div>
  );
};
export default MachineSpecEdit;
