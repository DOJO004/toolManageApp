import React from "react";
import NewStepOne from "./newStepOne";
import NewStepTwo from "./newStepTwo";
import NewStepThree from "./newStepThree";
import { CloseBtn } from "../../buttons";
import { useRouter } from "next/navigation";

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

interface ProductLineListItem {
  ProductLineID: string;
  ProductLineName: string;
}

interface MachineTypeListItem {
  MachineTypeID: string;
  MachineTypeName: string;
}

interface MachineSpecNewProps {
  machineSpec: MachineSpecItem;
  setMachineSpec: React.Dispatch<React.SetStateAction<MachineSpecItem>>;
  productLineList: ProductLineListItem[];
  machineTypeList: MachineTypeListItem[];
  currentPage: number;
  nextPage: () => void;
  prevPage: () => void;
  fetchAddMachineSpecInfo: () => void;
  changeNewMode: () => void;
}

const MachineSpecNew = ({
  machineSpec,
  setMachineSpec,
  productLineList,
  currentPage,
  nextPage,
  prevPage,
  machineTypeList,
  fetchAddMachineSpecInfo,
  changeNewMode,
}: MachineSpecNewProps) => {
  const router = useRouter();
  return (
    <div className="relative flex flex-col w-full p-4 mx-auto text-center bg-gray-900 border-2 max-w-96 rounded-xl">
      <p className="text-xl font-bold ">新增設備規格</p>
      {currentPage === 1 && (
        <NewStepOne
          machineSpec={machineSpec}
          setMachineSpec={setMachineSpec}
          productLineList={productLineList}
          machineTypeList={machineTypeList}
          nextPage={nextPage}
        />
      )}
      {currentPage === 2 && (
        <NewStepTwo
          machineSpec={machineSpec}
          setMachineSpec={setMachineSpec}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      )}
      {currentPage === 3 && (
        <NewStepThree
          machineSpec={machineSpec}
          setMachineSpec={setMachineSpec}
          prevPage={prevPage}
          fetchAddMachineSpecInfo={fetchAddMachineSpecInfo}
        />
      )}
      <div className="absolute top-3 right-5">
        <CloseBtn changeMode={changeNewMode} />
      </div>
    </div>
  );
};
export default MachineSpecNew;
