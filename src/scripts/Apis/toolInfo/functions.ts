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

// toolLifeStatusBackgroundColor
export const toolLifeStatusBackgroundColor = (lifeStatus: string) => {
  switch (lifeStatus) {
    case "Normal":
      return "bg-green-600";
    case "NeedRepair":
      return "bg-red-600";
    case "Alarm":
      return "bg-red-600";
    case "Repairing":
      return "bg-amber-600";
    case "Warning":
      return "bg-yellow-500";
    case "Scrap":
      return "bg-gray-500";
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
      return "倉儲中 / ";
    case 1:
      return "移出倉儲";
    case 2:
      return "裝載中 / ";
    default:
      return "-";
  }
};

// toolLogInfo
export const setOpActionsText = (opActions: number) => {
  switch (opActions) {
    case 0:
      return "入庫";
    case 1:
      return "重新入庫";
    case 2:
      return "出庫";
    case 3:
      return "修整";
    case 4:
      return "裝載";
    case 5:
      return "卸載";
    case -99:
      return "強制失敗";
    case -1:
      return "報廢";
    default:
      return "無法辨識此狀態";
  }
};

// ms to hh:mm:ss
export const formatTime = (milliseconds: number | string): string => {
  if (typeof milliseconds === "string") {
    milliseconds = parseInt(milliseconds);
  }
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

// hh:mm:ss to ms
export const parseTime = (time: string): number => {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  console.log(hours, minutes, seconds);
  return hours * 3600000 + minutes * 60000 + seconds * 1000;
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
