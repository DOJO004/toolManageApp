"use client";
import ProductLineNew from "@/app/ui/machineInfo/productLine/new";
import { apiAddProductLineInfo } from "@/scripts/api";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [productLineID, setProductLineID] = useState("");
  const [productLineName, setProductLineName] = useState("");
  const [notice, setNotice] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchAddProductLine = async (e: FormEvent) => {
    e.preventDefault();
    const res = await apiAddProductLineInfo(productLineID, productLineName);
    console.log(res);
    setNotice(true);
    if (res?.data?.Values?.ReqInt === 0) {
      setIsError(false);
      router.push("/tool-manager/machine-info/product-line");
    } else {
      console.log("add product line false.");
      setIsError(true);
    }
  };
  return (
    <div>
      <ProductLineNew
        productLineID={productLineID}
        setProductLineID={setProductLineID}
        productLineName={productLineName}
        setProductLineName={setProductLineName}
        fetchAddProductLine={fetchAddProductLine}
        notice={notice}
        isError={isError}
      />
    </div>
  );
}
