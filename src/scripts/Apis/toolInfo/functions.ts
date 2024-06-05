import { ToolStockItem } from "@/scripts/Apis/toolInfo/types";

// toolLifeStatusColor
export const toolLifeStatusTextColor = (lifeStatus: string) => {
  switch (lifeStatus) {
    case "Normal":
      return "text-green-400";
    case "NeedRepair":
      return "text-red-500";
    case "Alarm":
      return "text-red-500";
    case "Repairing":
      return "text-amber-600";
    case "Warning":
      return "text-yellow-300";
    case "Scrap":
      return "text-gray-500";
    default:
      return "";
  }
};

// toolStatusPieChartColor
export const toolStatusPieChartColor = (lifeStatus: string) => {
  switch (lifeStatus) {
    case "Normal":
      return "green";
    case "NeedRepair":
      return "red";
    case "Alarm":
      return "red";
    case "Repairing":
      return "orange";
    case "Warning":
      return "yellow";
    case "Scrap":
      return "gray";
    default:
      return "";
  }
};

export const translateLifeStatus = (lifeStatus: string) => {
  switch (lifeStatus) {
    case "Normal":
      return "正常";
    case "NeedRepair":
      return "需要維修";
    case "Alarm":
      return "警報";
    case "Repairing":
      return "維修中";
    case "Warning":
      return "警告";
    case "Scrap":
      return "報廢";
    default:
      return "未知狀態";
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

// ms to hh:mm:ss
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

// format mm to cm
export const formatMMToCM = (mm: number): number => {
  return parseFloat((mm / 10).toFixed(2));
};
