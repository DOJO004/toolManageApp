import SubmitButton from "@/components/buttons";
import { MachineTypeItem } from "@/scripts/Apis/machineInfo/types";

interface Props {
  machineTypeList: MachineTypeItem[];
  editMachineTypeMode: boolean;
  editMachineTypeModeIndex: number;
  editMachineType: MachineTypeItem;
  setEditMachineType: React.Dispatch<React.SetStateAction<MachineTypeItem>>;
  patchMachineType: () => void;
  deleteMachineType: () => void;
  handleClickEditMachineType: (item: MachineTypeItem, index: number) => void;
  isPending: boolean;
}

export default function MachineTypeIndex({
  machineTypeList,
  editMachineTypeMode,
  editMachineTypeModeIndex,
  editMachineType,
  setEditMachineType,
  patchMachineType,
  deleteMachineType,
  handleClickEditMachineType,
  isPending,
}: Props) {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-indigo-500 ">
          <th className="p-1 whitespace-nowrap">設備ID</th>
          <th className="p-1 whitespace-nowrap">設備名稱</th>
          <th className="p-1 whitespace-nowrap">編輯</th>
        </tr>
      </thead>
      <tbody>
        {machineTypeList.length > 0 ? (
          machineTypeList.map((item, index: number) =>
            // edit
            editMachineTypeMode && editMachineTypeModeIndex === index ? (
              <tr key={item.Id}>
                <td>{editMachineType.Id}</td>
                <td>
                  <input
                    type="text"
                    className="p-1 text-center text-black rounded-md w-96"
                    value={editMachineType.Name}
                    onChange={(e) => {
                      setEditMachineType((prev) => ({
                        ...prev,
                        Name: e.target.value,
                      }));
                    }}
                    autoFocus
                  />
                </td>
                <td>
                  <SubmitButton
                    name="完成"
                    classNames="p-1 bg-green-500 rounded-md hover:bg-green-600"
                    onclick={() => patchMachineType()}
                    isPending={isPending}
                  />
                  <span> / </span>
                  <button
                    className="p-1 bg-red-500 rounded-md hover:bg-red-900"
                    onClick={() => deleteMachineType()}
                  >
                    刪除
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={index} className="text-center hover:bg-gray-600">
                <td className="p-1 whitespace-nowrap">{item.Id}</td>
                <td className="p-1 whitespace-nowrap">{item.Name}</td>
                <td className="p-1 whitespace-nowrap">
                  <button
                    className="p-1 hover:bg-indigo-500"
                    onClick={() => handleClickEditMachineType(item, index)}
                  >
                    編輯
                  </button>
                </td>
              </tr>
            )
          )
        ) : (
          <tr>
            <td colSpan={3}>no data...</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
