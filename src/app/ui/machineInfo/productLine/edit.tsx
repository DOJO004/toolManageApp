import React, { FormEvent } from "react";
import Notice from "../../notice";
import { useRouter } from "next/navigation";
import { BackBtn, DeleteBtn } from "../../buttons";

interface ProductLineItem {
  ProductLineID: string;
  ProductLineName: string;
}
interface ProductLineEditProps {
  productLine: ProductLineItem;
  setProductLine: React.Dispatch<React.SetStateAction<ProductLineItem>>;
  fetchEditProductLine: (e: FormEvent) => void;
  fetchDeleteProductLine: () => void;
  notice: boolean;
  isError: boolean;
}
const ProductLineEdit = ({
  productLine,
  setProductLine,
  fetchEditProductLine,
  fetchDeleteProductLine,
  notice,
  isError,
}: ProductLineEditProps) => {
  const router = useRouter();
  return (
    <form
      className="relative flex flex-col justify-center w-full p-4 text-center bg-gray-900 rounded-xl"
      onSubmit={(e) => fetchEditProductLine(e)}
    >
      <p className="text-xl text-center ">編輯產線</p>
      {notice && <Notice isError={isError} />}
      <input
        type="text"
        value={productLine.ProductLineID}
        placeholder="生產線ID"
        className="block pl-2 mx-auto my-2 text-gray-300 rounded-md min-h-10 min-w-72"
        readOnly
      />
      <input
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
      <div className="absolute top-3 left-5">
        <BackBtn backFunction={router.back} />
      </div>
      <div className="absolute top-2 right-4">
        <DeleteBtn deleteFunction={fetchDeleteProductLine} />
      </div>
    </form>
  );
};
export default ProductLineEdit;
