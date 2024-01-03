import React, { useRef } from "react";

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

interface StepProps {
  toolTypeList: ToolTypeItem[];
  toolSpecInfo: ToolSpecItem;
  setToolSpecInfo: React.Dispatch<React.SetStateAction<ToolSpecItem>>;
}

export const CommonStepProps: StepProps = {
  toolTypeList: [],
  toolSpecInfo: {
    ToolSpecID: "",
    Name: "",
    ToolType: "",
    Specification: {
      BladeDiameter: "",
      BladeHeight: "",
      TotalLength: "",
      HandleDiameter: "",
    },
    SafetyStock: "",
    MaxLife: {
      ProcessCnt: "",
      ProcessTime: "",
      ProcessLength: "",
      RepairCnt: "",
    },
  },
  setToolSpecInfo: () => {},
};
