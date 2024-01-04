import React from "react";
import Notice from "../../notice";
import EditStepOne from "./editStepOne";
import EditStepTwo from "./editStepTwo";
import EditStepThree from "./editStepThree";
import { useRouter } from "next/navigation";
import { BackBtn, DeleteBtn } from "../../buttons";

interface ToolTypeListItem {
  ToolTypeID: string;
  Name: string;
}

interface ToolInfoItem {
  ToolSpecID: string;
  Name: string;
  ToolType: string;
  Specification: {
    BladeDiameter: string;
    BladeHeight: string;
    TotalLength: string;
    HandleDiameter: string;
  };
  SafetyStock: string;
  MaxLife: {
    ProcessCnt: string;
    ProcessTime: string;
    ProcessLength: string;
    RepairCnt: string;
  };
}

interface ToolSpecEditProps {
  toolInfo: ToolInfoItem;
  setToolInfo: React.Dispatch<React.SetStateAction<ToolInfoItem>>;
  toolTypeList: ToolTypeListItem[];
  currentPage: number;
  nextPage: () => void;
  prevPage: () => void;
  fetchEditToolInfo: () => void;
  notice: boolean;
  isError: boolean;
  fetchDisableToolSpecInfo: () => void;
}
const ToolSpecEdit = ({
  toolInfo,
  setToolInfo,
  toolTypeList,
  currentPage,
  nextPage,
  prevPage,
  fetchEditToolInfo,
  notice,
  isError,
  fetchDisableToolSpecInfo,
}: ToolSpecEditProps) => {
  const router = useRouter();
  return (
    <div className="relative flex flex-col justify-center w-full p-4 text-center bg-gray-900 rounded-xl">
      <p>修改刀具規格</p>
      {notice && <Notice isError={isError} />}
      <div className="text-black ">
        <div className={currentPage === 1 ? "block" : "hidden"}>
          <EditStepOne
            toolInfo={toolInfo}
            setToolInfo={setToolInfo}
            nextPage={nextPage}
            toolTypeList={toolTypeList}
          />
        </div>
        <div className={currentPage === 2 ? "block" : "hidden"}>
          <EditStepTwo
            toolInfo={toolInfo}
            setToolInfo={setToolInfo}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        </div>
        <div className={currentPage === 3 ? "block" : "hidden"}>
          <EditStepThree
            toolInfo={toolInfo}
            setToolInfo={setToolInfo}
            prevPage={prevPage}
            fetchEditToolInfo={fetchEditToolInfo}
          />
        </div>
        <div className="absolute top-3 right-3">
          <DeleteBtn deleteFunction={fetchDisableToolSpecInfo} />
        </div>
        <div className="absolute top-2 left-5">
          <BackBtn backFunction={router.back} />
        </div>
      </div>
    </div>
  );
};

export default ToolSpecEdit;
