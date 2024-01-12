"use client";

import Notice from "@/app/ui/notice";
import {
  apiDisabledEToolCodeInfo,
  apiGetELabelBindStatusInfoList,
  confirmDisable,
} from "@/scripts/api";
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
    console.log(res);
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
  return (
    <div className="p-2 mr-4 bg-gray-900 rounded-md md:max-w-[800px] flex  flex-col justify-center">
      <p className="text-2xl text-center ">歸還刀具</p>
      <table className="w-full text-center">
        <thead>
          <tr className="font-bold ">
            <td>標籤號碼</td>
            <td>刀具SN</td>
            <td>歸還</td>
          </tr>
        </thead>
        <tbody>
          {eLabelBindStatusInfoList.map((item, index) => (
            <tr key={index}>
              <td>{item.LabelCode}</td>
              <td>{item.ToolSN}</td>
              <td>
                <button onClick={() => fetchReturnTool(item.LabelCode)}>
                  歸還
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <Notice notice={notice} setNotice={setNotice} isError={isError} />
      </div>
    </div>
  );
}
