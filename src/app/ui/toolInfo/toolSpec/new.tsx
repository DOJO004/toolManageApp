import React from "react";
import NewStepOne from "./newStepOne";
import NewStepTwo from "./newStepTwo";
import NewStepThree from "./newStepThree";
import { CloseBtn } from "../../buttons";

interface ToolTypeItem {
  Name: string;
  ToolTypeID: string;
}

interface ToolSpecItem {
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

interface ToolSpecNewProps {
  toolTypeList: ToolTypeItem[];
  toolSpecInfo: ToolSpecItem;
  setToolSpecInfo: React.Dispatch<React.SetStateAction<ToolSpecItem>>;
  fetchNewToolSpecInfo: () => void;
  changeNewMode: () => void;
  currentPage: number;
  nextPage: () => void;
  prevPage: () => void;
}

const ToolSpecNew = ({
  toolTypeList,
  toolSpecInfo,
  setToolSpecInfo,
  fetchNewToolSpecInfo,
  changeNewMode,
  currentPage,
  nextPage,
  prevPage,
}: ToolSpecNewProps) => {
  return (
    <div className="relative flex flex-col justify-center w-full p-4 mb-2 text-center bg-gray-900 border-2 md:mx-auto md:w-fit rounded-xl">
      <p>新增刀具規格</p>
      <div className="text-black">
        <div className={currentPage === 1 ? "block" : "hidden"}>
          <NewStepOne
            toolSpecInfo={toolSpecInfo}
            setToolSpecInfo={setToolSpecInfo}
            toolTypeList={toolTypeList}
            nextPage={nextPage}
          />
        </div>
        <div className={currentPage === 2 ? "block" : "hidden"}>
          <NewStepTwo
            toolSpecInfo={toolSpecInfo}
            setToolSpecInfo={setToolSpecInfo}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        </div>
        <div className={currentPage === 3 ? "block" : "hidden"}>
          <NewStepThree
            setToolSpecInfo={setToolSpecInfo}
            toolSpecInfo={toolSpecInfo}
            fetchNewToolSpecInfo={fetchNewToolSpecInfo}
            prevPage={prevPage}
          />
        </div>
      </div>
      <div className="absolute top-3 right-5">
        <CloseBtn changeMode={changeNewMode} />
      </div>
    </div>
  );
};

export default ToolSpecNew;
