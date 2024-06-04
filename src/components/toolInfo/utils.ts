import { ToolStockItem } from "@/scripts/Apis/toolInfo/types";

export const getLifeStatusClassName = (lifeStatus: string) => {
  switch (lifeStatus) {
    case "Normal":
      return "text-green-500";
    case "NeedRepair":
      return "text-red-500";
    case "Repairing":
      return "text-amber-500";
    case "Scrap":
      return "text-gray-500";
    default:
      return "";
  }
};

export const translateLifeStatus = (lifeStatus: string) => {
  switch (lifeStatus) {
    case "Normal":
      return "正常";
    case "NeedRepair":
      return "需要修整";
    case "Repairing":
      return "修理中";
    case "Scrap":
      return "報廢";
    default:
      return "";
  }
};

export const handleToolPositionData = (positionStatus: number) => {
  switch (positionStatus) {
    case 0:
      return "倉儲中";
    case 1:
      return "移出倉儲";
    case 2:
      return "裝載中";
    default:
      return "未知狀態";
  }
};

export const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

export const sortToolInfoList = (toolInfoList: ToolStockItem[]) => {
  const referenceTable: { [key: string]: number } = {
    Normal: 1,
    Repairing: 2,
    Scrap: 3,
  };

  return toolInfoList.slice().sort((a, b) => {
    if (referenceTable[a.LifeStatus] > referenceTable[b.LifeStatus]) {
      return 1;
    }
    if (referenceTable[a.LifeStatus] < referenceTable[b.LifeStatus]) {
      return -1;
    }
    return 0;
  });
};
