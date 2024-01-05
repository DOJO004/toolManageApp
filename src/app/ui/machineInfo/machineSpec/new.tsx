import React from "react";
import NewStepOne from "./newStepOne";
import NewStepTwo from "./newStepTwo";
import NewStepThree from "./newStepThree";
import Notice from "../../notice";
import { BackBtn, CloseBtn } from "../../buttons";
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
  notice: boolean;
  isError: boolean;
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
  notice,
  isError,
}: MachineSpecNewProps) => {
  const router = useRouter();
  return (
    <div className="relative flex flex-col justify-center w-full p-4 mb-2 text-center bg-gray-900 md:mx-auto md:w-fit rounded-xl">
      <p>新增設備規格</p>
      {notice && <Notice isError={isError} />}
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