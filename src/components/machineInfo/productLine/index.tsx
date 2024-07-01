import SubmitButton from "@/components/buttons";
import {
  EditProductLineItem,
  ProductLineItem,
} from "@/scripts/Apis/machineInfo/types";
import { DepartmentItem } from "@/scripts/Apis/userInfo/types";

interface Props {
  productLineList: ProductLineItem[];
  editProductLineMode: boolean;
  editProductLineIndex: number;
  editProductLine: EditProductLineItem;
  handelSetEditData: (key: string, value: string) => void;
  departmentList: DepartmentItem[];
  patchProductLine: () => void;
  deleteProductLine: () => void;
  handleClickEditProductLine: (item: ProductLineItem, index: number) => void;
  isPending: boolean;
}
export default function ProductLineIndex({
  productLineList,
  editProductLineMode,
  editProductLineIndex,
  editProductLine,
  handelSetEditData,
  departmentList,
  patchProductLine,
  deleteProductLine,
  handleClickEditProductLine,
  isPending,
}: Props) {
  return (
    <table className="w-full ">
      <thead>
        <tr className="bg-indigo-500 ">
          <th className="p-1 whitespace-nowrap">產線ID</th>
          <th className="p-1 whitespace-nowrap">產線名稱</th>
          <th className="p-1 whitespace-nowrap">負責部門</th>
          <th className="p-1 whitespace-nowrap">編輯</th>
        </tr>
      </thead>
      <tbody>
        {productLineList.length > 0 ? (
          productLineList.map((item, index) =>
            // edit
            editProductLineMode && editProductLineIndex === index ? (
              <tr key={item.Id}>
                <td>{editProductLine.Id}</td>
                <td>
                  <input
                    type="text"
                    value={editProductLine.Name}
                    className="p-1 text-center text-black rounded-md"
                    autoFocus
                    onChange={(e) => handelSetEditData("Name", e.target.value)}
                  />
                </td>
                <td>
                  <select
                    className="p-1 text-center text-black rounded-md"
                    value={editProductLine.DepartmentId}
                    onChange={(e) =>
                      handelSetEditData("DepartmentId", e.target.value)
                    }
                  >
                    {departmentList.map((item) => (
                      <option
                        key={item.Id}
                        value={item.Id}
                        className="text-black"
                      >
                        {item.Name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <SubmitButton
                    name="送出"
                    classNames="p-1 bg-green-500 hover:bg-green-600"
                    onclick={() => patchProductLine()}
                    isPending={isPending}
                  />
                  <span> / </span>
                  <button
                    className="p-1 bg-red-500 hover:bg-red-600"
                    onClick={() => deleteProductLine()}
                  >
                    刪除
                  </button>
                </td>
              </tr>
            ) : (
              // index
              <tr key={item.Id} className=" hover:bg-gray-600">
                <td className="p-1 whitespace-nowrap">{item.Id}</td>
                <td className="p-1 whitespace-nowrap">{item.Name}</td>
                <td className="p-1 whitespace-nowrap">
                  {item.Department.Name}
                </td>

                <td className="p-1 whitespace-nowrap">
                  <button
                    className="p-1 cursor-pointer hover:bg-indigo-600"
                    onClick={() => handleClickEditProductLine(item, index)}
                  >
                    編輯
                  </button>
                </td>
              </tr>
            )
          )
        ) : (
          <tr>
            <td colSpan={4}>no data...</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
