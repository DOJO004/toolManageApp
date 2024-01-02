interface ToolInfoLogProps {}
const ToolInfoLog = ({}: ToolInfoLogProps) => {
  return (
    <div className="text-xs text-center">
      <div className="text-base text-left ">刀具裝卸載日誌</div>
      <div className="grid grid-cols-4 gap2">
        <div className="truncate">設備序號</div>
        <div className="truncate">動作</div>
        <div className="truncate">刀庫號</div>
        <div className="truncate">動作時間</div>
      </div>
      <div className="grid grid-cols-4 gap2">
        <div>{}</div>
        <div>{}</div>
        <div>{}</div>
        <div>{}</div>
      </div>
    </div>
  );
};

export default ToolInfoLog;
