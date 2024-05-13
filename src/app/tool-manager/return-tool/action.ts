export function toolStockStatusInfo(status: number) {
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
}
