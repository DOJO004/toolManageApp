import React, { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { BackBtn, CloseBtn, DeleteBtn } from "../../buttons";

interface ProductLineItem {
  ProductLineID: string;
  ProductLineName: string;
}
interface ProductLineEditProps {
  productLine: ProductLineItem;
  setProductLine: React.Dispatch<React.SetStateAction<ProductLineItem>>;
  fetchEditProductLine: (e: FormEvent) => void;
  fetchDeleteProductLine: () => void;
  changeEditMode: () => void;
}
const ProductLineEdit = ({
  productLine,
  setProductLine,
  fetchEditProductLine,
  fetchDeleteProductLine,
  changeEditMode,
}: ProductLineEditProps) => {
  const router = useRouter();
  return (
    <div className="relative mb-2 ">
      <form
        className="flex flex-col justify-center w-full p-4 text-center bg-gray-900 border rounded-xl"
        onSubmit={(e) => fetchEditProductLine(e)}
      >
        <p className="text-xl text-center ">編輯產線</p>
        <label htmlFor="ProductLineID">ID</label>
        <input
          id="ProductLineID"
          type="text"
          value={productLine.ProductLineID}
          placeholder="生產線ID"
          className="block pl-2 mx-auto my-2 text-gray-300 rounded-md min-h-10 min-w-72"
          readOnly
        />
        <label htmlFor="ProductLineName">名稱</label>
        <input
          id="ProductLineName"
          type="text"
          value={productLine.ProductLineName}
          placeholder="生產線名稱"
          className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
          onChange={(e) =>
            setProductLine({ ...productLine, ProductLineName: e.target.value })
          }
        />
        <button className="block pl-2 mx-auto my-2 bg-blue-500 rounded-md min-h-10 min-w-72">
          完成
        </button>
      </form>
      <div className="absolute top-2 right-3">
        <CloseBtn changeMode={changeEditMode} />
      </div>
      <div className="absolute top-2 left-2">
        <DeleteBtn deleteFunction={fetchDeleteProductLine} />
      </div>
    </div>
  );
};
export default ProductLineEdit;
