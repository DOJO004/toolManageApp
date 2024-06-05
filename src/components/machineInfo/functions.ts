export function formatMilliseconds(milliseconds: number) {
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
  const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);

  const paddedSeconds = String(seconds).padStart(2, "0");
  const paddedMinutes = String(minutes).padStart(2, "0");
  const paddedHours = String(hours).padStart(2, "0");

  return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
}

export function formatPercent(number: number) {
  return (number * 100).toFixed(2);
}

// 設定運行狀態中文
export const translateMachineStatus = (status: string) => {
  switch (status) {
    case "Emergency":
      return "緊急停止";
    case "Running":
      return "運行中";
    case "Disconnect":
      return "離線";
    default:
      return "未知狀態";
  }
};

// 設定運行狀態文字顏色
export const setMachineStatusTextColor = (status: string) => {
  switch (status) {
    case "Emergency":
      return "text-red-500";
    case "Running":
      return "text-green-500";
    case "Disconnect":
      return "text-gray-500";
    default:
      return "text-gray-500";
  }
};

// 設定運行狀態背景顏色
export const setMachineBackgroundColor = (status: string) => {
  switch (status) {
    case "Emergency":
      return "bg-red-500";
    case "Running":
      return "bg-green-500";
    case "Disconnect":
      return "bg-gray-500";
    default:
      return "bg-gray-500";
  }
};
