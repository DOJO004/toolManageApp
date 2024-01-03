"use client";

import ProductLineIndex from "@/app/ui/machineInfo/productLine";
import { apiGetProductLineInfoList } from "@/scripts/api";
import { useEffect, useState } from "react";

export default function Page() {
  const [productLineList, setProductLineList] = useState([]);

  const fetchGetProductLineList = async () => {
    const res = await apiGetProductLineInfoList();
    console.log(res);
    if (res?.data?.Values?.ReqInt === 0) {
      setProductLineList(res.data.Values.ProductLineList);
    } else {
      console.log("get product line list false.");
    }
  };

  useEffect(() => {
    fetchGetProductLineList();
  }, []);
  return (
    <div>
      <ProductLineIndex productLineList={productLineList} />
    </div>
  );
}
