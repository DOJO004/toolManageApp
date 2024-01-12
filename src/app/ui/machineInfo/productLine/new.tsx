import React, { FormEvent } from "react";
import { BackBtn, CloseBtn } from "../../buttons";
import { useRouter } from "next/navigation";
import Notice from "../../notice";

interface ProductLineNewProps {
  productLineID: string;
  setProductLineID: React.Dispatch<React.SetStateAction<string>>;
  productLineName: string;
  setProductLineName: React.Dispatch<React.SetStateAction<string>>;
  fetchAddProductLine: (e: FormEvent) => void;
  changeNewMode: () => void;
  notice: boolean;
  isError: boolean;
}

const ProductLineNew = ({
  productLineID,
  setProductLineID,
  productLineName,
  setProductLineName,
  fetchAddProductLine,
  changeNewMode,
  notice,
  isError,
}: ProductLineNewProps) => {
  const router = useRouter();
  return (
    <div className="relative mb-2">
      <form
        className="flex flex-col justify-center w-full p-4 text-center bg-gray-900 border-2 md:max-w-96 rounded-xl"
        onSubmit={(e) => fetchAddProductLine(e)}
      >
        <p className="text-xl text-center ">新增產線</p>
        {notice && <Notice isError={isError} />}
        <input
          type="text"
          value={productLineID}
          placeholder="生產線ID"
          className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
          onChange={(e) => setProductLineID(e.target.value)}
        />
        <input
          type="text"
          value={productLineName}
          placeholder="生產線名稱"
          className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
          onChange={(e) => setProductLineName(e.target.value)}
        />
        <button className="block pl-2 mx-auto my-2 bg-blue-500 rounded-md min-h-10 min-w-72">
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
