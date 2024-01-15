import React from "react";
import EditStepOne from "./editStepOne";
import EditStepTwo from "./editStepTwo";
import EditStepThree from "./editStepThree";
import { CloseBtn, DeleteBtn } from "../../buttons";

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
  editToolSpec: ToolInfoItem;
  setEditToolSpec: React.Dispatch<React.SetStateAction<ToolInfoItem>>;
  toolTypeList: ToolTypeListItem[];
  nextPage: () => void;
  prevPage: () => void;
  fetchEditToolInfo: () => void;
  fetchDisableToolSpecInfo: () => void;
  changeMode: () => void;
  currentPage: number;
}
const ToolSpecEdit = ({
  editToolSpec,
  setEditToolSpec,
  toolTypeList,
  currentPage,
  nextPage,
  prevPage,
  fetchEditToolInfo,
  fetchDisableToolSpecInfo,
  changeMode,
}: ToolSpecEditProps) => {
  return (
    <div className="relative flex flex-col justify-center w-full p-4 mb-2 text-center bg-gray-900 border-2 md:mx-auto md:min-w-72 md:w-fit rounded-xl">
      <p>修改刀具規格</p>
      <div className="text-black ">
        <div className={currentPage === 1 ? "block" : "hidden"}>
          <EditStepOne
            editToolSpec={editToolSpec}
            setEditToolSpec={setEditToolSpec}
            nextPage={nextPage}
            toolTypeList={toolTypeList}
          />
        </div>
        <div className={currentPage === 2 ? "block" : "hidden"}>
          <EditStepTwo
            editToolSpec={editToolSpec}
            setEditToolSpec={setEditToolSpec}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        </div>
        <div className={currentPage === 3 ? "block" : "hidden"}>
          <EditStepThree
            editToolSpec={editToolSpec}
            setEditToolSpec={setEditToolSpec}
            prevPage={prevPage}
            fetchEditToolInfo={fetchEditToolInfo}
          />
        </div>
        <div className="absolute top-3 right-3">
          <CloseBtn changeMode={changeMode} />
        </div>
        <div className="absolute top-3 left-3">
          <DeleteBtn deleteFunction={fetchDisableToolSpecInfo} />
        </div>
      </div>
    </div>
  );
};

export default ToolSpecEdit;
