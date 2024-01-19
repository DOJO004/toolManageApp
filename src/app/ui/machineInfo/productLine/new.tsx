import React, { FormEvent } from "react";
import { BackBtn, CloseBtn } from "../../buttons";
import { useRouter } from "next/navigation";

interface ProductLineNewProps {
  productLineID: string;
  setProductLineID: React.Dispatch<React.SetStateAction<string>>;
  productLineName: string;
  setProductLineName: React.Dispatch<React.SetStateAction<string>>;
  fetchAddProductLine: (e: FormEvent) => void;
  changeNewMode: () => void;
}

const ProductLineNew = ({
  productLineID,
  setProductLineID,
  productLineName,
  setProductLineName,
  fetchAddProductLine,
  changeNewMode,
}: ProductLineNewProps) => {
  const router = useRouter();
  return (
    <div className="relative w-full m-4 max-w-96">
      <form
        className="flex flex-col justify-center w-full p-4 text-center bg-gray-900 border-2 rounded-xl"
        onSubmit={(e) => fetchAddProductLine(e)}
      >
        <p className="text-xl font-bold text-center">新增產線</p>
        <hr className="my-2" />
        <div>
          <label htmlFor="product-line-id">生產線ID</label>
          <input
            id="product-line-id"
            type="text"
            value={productLineID}
            placeholder="生產線ID"
            className="block w-full pl-2 mx-auto my-2 text-black rounded-md min-h-10"
            onChange={(e) => setProductLineID(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="product-line-name">生產線名稱</label>
          <input
            id="product-line-name"
            type="text"
            value={productLineName}
            placeholder="生產線名稱"
            className="block w-full pl-2 mx-auto my-2 text-black rounded-md min-h-10"
            onChange={(e) => setProductLineName(e.target.value)}
          />
        </div>
        <button className="block w-full pl-2 mx-auto mt-6 bg-blue-500 rounded-md min-h-10">
          完成
        </button>
      </form>
      <div className="absolute top-3 right-5">
        <CloseBtn changeMode={changeNewMode} />
      </div>
    </div>
  );
};

export default ProductLineNew;
