export const getToolStatusClass = (status: string) => {
  switch (status) {
    case "Normal":
      return "text-green-500";
    case "NeedRepair":
      return "text-red-500";
    case "Repairing":
      return "text-gray-400";
    case "Scrap":
      return "text-gray-500";
    default:
      return "";
  }
};

export const toolPositionInfo = (status: number) => {
  switch (status) {
    case 0:
      return "存放於倉儲中";
    case 1:
      return "已移出倉儲";
    case 2:
      return "裝載於設備中";
    case -1:
      return "未知狀態";
    default:
      return "無此狀態";
  }
};

export const selectedButtonBackgroundColor = (
  selectedToolClass: string[],
  name: string
) => {
  if (selectedToolClass.includes(name)) {
    return "bg-indigo-500";
  }
};
