"use client";
import { useRouter, usePathname } from "next/navigation";
import ProductLineEdit from "@/app/ui/machineInfo/productLine/edit";
import {
  apiGetProductLineInfoList,
  apiModifyProductLineInfo,
  disabledProductLineInfo,
} from "@/scripts/api";
import { FormEvent, useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const pathID = usePathname().split("/")[4];
  const [productLine, setProductLine] = useState({
    ProductLineID: "",
    ProductLineName: "",
  });
  const [notice, setNotice] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchEditProductLine = async (e: FormEvent) => {
    e.preventDefault();
    const res = await apiModifyProductLineInfo(
      productLine.ProductLineID,
      productLine.ProductLineName
    );
    console.log(res);

    setNotice(true);
    if (res?.data?.Values?.ReqInt === 0) {
      setIsError(false);
      router.push("/tool-manager/machine-info/product-line");
    } else {
      console.log("edit product line false.");
      setIsError(true);
    }
  };

  const fetchGetProductLineList = async () => {
    const res = await apiGetProductLineInfoList();
    if (res?.data?.Values?.ReqInt === 0) {
      setProductLine(res.data.Values.ProductLineList[pathID]);
    } else {
      console.log("get product line list false.");
    }
  };

  const fetchDeleteProductLine = async () => {
    const res = await disabledProductLineInfo(productLine.ProductLineID);
    console.log(res);

    if (res?.data?.Values?.ReqInt === 0) {
      router.push("/tool-manager/machine-info/product-line");
    } else {
      console.log("delete product line false.");
    }
  };

  useEffect(() => {
    fetchGetProductLineList();
  }, []);

  return (
    <div>
      <ProductLineEdit
        fetchEditProductLine={fetchEditProductLine}
        fetchDeleteProductLine={fetchDeleteProductLine}
        notice={notice}
        isError={isError}
        productLine={productLine}
        setProductLine={setProductLine}
      />
    </div>
  );
}
