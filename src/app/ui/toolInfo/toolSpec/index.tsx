import Link from "next/link";
import LinkBtn from "../../linkBtn";
interface ToolSpecItem {
  ToolSpecID: string;
  Name: string;
  ToolType: string;
  Specification: {
    BladeDiameter: number;
    BladeHeight: number;
    TotalLength: number;
    HandleDiameter: number;
  };
  SafetyStock: number;
  MaxLife: {
    ProcessCnt: number;
    ProcessTime: number;
    ProcessLength: number;
    RepairCnt: number;
  };
}

interface ToolSpecIndexProps {
  toolSpecList: ToolSpecItem[];
}

const ToolSpecIndex = ({ toolSpecList }: ToolSpecIndexProps) => {
  return (
    <div className="relative w-full p-2 text-center bg-gray-900 max-w-fit rounded-xl">
      <p className="text-xl">刀具規格</p>
      <div className="grid grid-cols-12 gap-2 p-1 bg-gray-800 rounded-xl">
        <div className="truncate ">ID</div>
        <div className="truncate ">名稱</div>
        <div className="truncate ">Φ</div>
        <div className="truncate ">高度</div>
        <div className="truncate ">總長度</div>
        <div className="truncate ">手柄Φ</div>
        <div className="truncate ">安全庫存</div>
        <div className="truncate ">最大修整次數</div>
        <div className="truncate ">最大加工次數</div>
        <div className="truncate ">最大加工長度</div>
        <div className="truncate ">最大加工時間</div>
        <div className="truncate ">編輯</div>
      </div>
      <div className="grid grid-cols-12 gap-2">
        {toolSpecList.map((item, index) => (
          <>
            <div className="truncate ">{item.ToolSpecID}</div>
            <div className="truncate ">{item.Name}</div>
            <div className="truncate ">{item.Specification.BladeDiameter}</div>
            <div className="truncate ">{item.Specification.BladeHeight}</div>
            <div className="truncate ">{item.Specification.TotalLength}</div>
            <div className="truncate ">{item.Specification.HandleDiameter}</div>
            <div className="truncate ">{item.SafetyStock}</div>
            <div className="truncate ">{item.MaxLife.ProcessCnt}</div>
            <div className="truncate ">{item.MaxLife.ProcessTime}</div>
            <div className="truncate ">{item.MaxLife.ProcessLength}</div>
            <div className="truncate ">{item.MaxLife.ProcessTime}</div>
            <div className="">
              <Link
                href={`/tool-manager/tool-info/tool-spec/${item.ToolSpecID}/edit`}
              >
                編輯
              </Link>
            </div>
          </>
        ))}
      </div>
      <button className="absolute top-3 right-2">
        <LinkBtn link={"/tool-manager/tool-info/tool-spec/new"} />
      </button>
    </div>
  );
};

export default ToolSpecIndex;
