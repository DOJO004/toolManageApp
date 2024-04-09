"use client";

import { apiNewProductLineType } from "@/scripts/Apis/productLineType/productLineType";
import { FormEvent, useState } from "react";

interface NewProductLineProps {
  getProductLineList: () => void;
}

export default function NewProductLine({
  getProductLineList,
}: NewProductLineProps) {
  const [newProductLine, setNewProductLine] = useState({
    Id: "",
    Name: "",
  });

  const postProductLine = async (e: FormEvent) => {
    e.preventDefault();
    const res = await apiNewProductLineType(newProductLine);
    console.log(res);
    if (res?.data?.Values?.ReqInt === 0) {
      getProductLineList();
      cleanProductLine();
    }
  };

  const cleanProductLine = () => {
    setNewProductLine({
      Id: "",
      Name: "",
    });
  };

  const handleNewProductLine = (key: string, value: string) => {
    setNewProductLine((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <div className="w-full my-4">
      <h3>新增產線類型</h3>
      <form
        className="max-w-lg mx-auto my-4"
        onSubmit={(e) => postProductLine(e)}
      >
        <div className="my-4">
          <label htmlFor="Id">產線 ID</label>
          <input
            type="text"
            id="Id"
            className="w-full p-2 text-black rounded-md "
            value={newProductLine.Id}
            onChange={(e) => handleNewProductLine("Id", e.target.value)}
          />
        </div>
        <div className="my-4">
          <label htmlFor="Name">產線名稱</label>
          <input
            type="text"
            id="Name"
            className="w-full p-2 text-black rounded-md "
            value={newProductLine.Name}
            onChange={(e) => handleNewProductLine("Name", e.target.value)}
          />
        </div>
        <button className="w-full bg-gray-600 rounded-md hover:bg-gray-500">
          新增
        </button>
      </form>
    </div>
  );
}
