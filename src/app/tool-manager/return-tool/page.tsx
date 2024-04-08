"use client";

import Notice from "@/app/ui/notice";
import PageController from "@/app/ui/pageController/pageController";

import { useEffect, useState } from "react";

interface ELToolBindStatusItem {
  LabelCode: string;
  eLabelSN: string;
  StationCode: string;
  BindStatus: string;
  eLToolCode: string;
  ToolSN: string;
  ToolSpec: {
    ToolSpecID: string;
    ToolType: string;
    ToolName: string;
  };
  LastModify: string;
}

export default function Page() {
  const [eLabelBindStatusInfoList, setELabelBindStatusInfoList] = useState<
    ELToolBindStatusItem[]
  >([]);
  const [notice, setNotice] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchGetELabelBindStatusInfoList = async () => {
    const res = await apiGetELabelBindStatusInfoList();
    console.log("get bind status list", res);
    if (res?.data?.Values?.ReqInt === 0) {
      setELabelBindStatusInfoList(
        res.data.Values.eLToolBindStatusList.filter(
          (item: ELToolBindStatusItem) => item.BindStatus === "Standby"
        )
      );
    } else {
      console.log("get eLabel bind status list false.");
    }
  };

  const fetchReturnTool = async (eLabelCode: string) => {
    const confirm = confirmDisable("確定歸還嗎?");
    if (confirm) {
      setNotice(true);
      const res = await apiDisabledEToolCodeInfo(eLabelCode);
      console.log(res);

      if (res?.data?.Values?.ReqInt === 0) {
        setIsError(false);
        fetchGetELabelBindStatusInfoList();
      } else {
        setIsError(true);
        console.log(" return tool false.");
      }
    }
  };

  useEffect(() => {
    fetchGetELabelBindStatusInfoList();
  }, []);
  useEffect(() => {
    console.log(eLabelBindStatusInfoList.length);
  }, [eLabelBindStatusInfoList]);
  return (
    <div className="w-full max-w-4xl p-2 mr-4 bg-gray-900 rounded-md h-fit">
      <div>
        <p className="text-center ">歸還刀具</p>
        <hr className="my-2 " />
        <div className="overflow-auto rounded-t-xl">
          <table className="w-full text-center md:min-w-96">
            <thead>
              <tr className="font-bold bg-indigo-300 ">
                <td className="p-2 text-black whitespace-nowrap">標籤號碼</td>
                <td className="p-2 text-black whitespace-nowrap">刀具SN</td>
                <td className="p-2 text-black whitespace-nowrap">歸還</td>
              </tr>
            </thead>
            <tbody>
              {eLabelBindStatusInfoList.length >= 1 ? (
                <>
                  {eLabelBindStatusInfoList.map((item, index) => (
                    <tr
                      key={index}
                      className=" hover:bg-indigo-500 even:bg-gray-700"
                    >
                      <td className="p-2 whitespace-nowrap">
                        {item.LabelCode}
                      </td>
                      <td className="p-2 whitespace-nowrap">{item.ToolSN}</td>
                      <td className="p-2 whitespace-nowrap">
                        <button
                          onClick={() => fetchReturnTool(item.eLToolCode)}
                        >
                          歸還
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr>
                  <td colSpan={3} className="py-2 ">
                    尚未綁定刀具
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div>
          <Notice notice={notice} setNotice={setNotice} isError={isError} />
        </div>
        <div className="my-2">
          <PageController />
        </div>
      </div>
    </div>
  );
}
