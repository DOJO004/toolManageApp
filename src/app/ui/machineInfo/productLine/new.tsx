"use client";

import { apiAddProductLine } from "@/scripts/apis/product-line";
import { FormEvent, useState } from "react";

interface ProductLineNewProps {
  fetchGetProductLineList: () => void;
}

export default function ProductLineNew({
  fetchGetProductLineList,
}: ProductLineNewProps) {
  const [newProductLine, setProductLine] = useState({
    Id: "",
    Name: "",
  });

  const handleInput = (name: string, value: string) => {
    setProductLine((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchAddProductLine = async (e: FormEvent) => {
    e.preventDefault();
    const res = await apiAddProductLine(newProductLine);
    const reqInt = res?.data?.Values?.ReqInt;

    if (reqInt === 0) {
      setProductLine({ Id: "", Name: "" });
    }
    fetchGetProductLineList();
  };
  return (
    <div className="my-4 border-b-2 ">
      <form onSubmit={(e) => fetchAddProductLine(e)}>
        <p className="text-xl text-center ">new product line</p>
        <input
          type="text"
          className="my-2 input"
          placeholder="ID"
          value={newProductLine.Id}
          onChange={(e) => handleInput("Id", e.target.value)}
        />
        <input
          type="text"
          className="my-2 input"
          placeholder="Name"
          value={newProductLine.Name}
          onChange={(e) => handleInput("Name", e.target.value)}
        />
        <button className="w-full p-1 my-4 bg-indigo-500 rounded-md ">
          送出
        </button>
      </form>
    </div>
  );
}
