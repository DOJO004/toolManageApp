import React from "react";
import NewStepOne from "./newStepOne";
import NewStepTwo from "./newStepTwo";
import NewStepThree from "./newStepThree";
import Notice from "../../notice";

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
  currentPage: number;
  nextPage: () => void;
  prevPage: () => void;
  notice: boolean;
  isError: boolean;
}

const ToolSpecNew = ({
  toolTypeList,
  toolSpecInfo,
  setToolSpecInfo,
  fetchNewToolSpecInfo,
  currentPage,
  nextPage,
  prevPage,
  notice,
  isError,
}: ToolSpecNewProps) => {
  return (
    <div className="flex flex-col justify-center w-full p-4 text-center bg-gray-900 rounded-xl">
      <p>新增刀具規格</p>
      {notice && <Notice isError={isError} />}
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
    </div>
  );
};

export default ToolSpecNew;
