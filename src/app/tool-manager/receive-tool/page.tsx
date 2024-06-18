"use client";
import Form from "@/components/receiveTool/form";
import UnBindLabel from "@/components/receiveTool/unbindLabel";
import UnbindTool from "@/components/receiveTool/unbindTool";
import {
  apiBindELabelInfo,
  apiGetELabelList,
} from "@/scripts/Apis/eLabelInfo/eLabelInfoApis";
import { BindToolDataItem, LabelItem } from "@/scripts/Apis/eLabelInfo/types";
import { apiGetToolStockList } from "@/scripts/Apis/toolInfo/toolInfoApis";
import { ToolStockItem } from "@/scripts/Apis/toolInfo/types";
import { UserAccountItem } from "@/scripts/Apis/userInfo/types";
import { apiGetUserInfoList } from "@/scripts/Apis/userInfo/userInfoApis";
import { useHandleNotice } from "@/scripts/notice";
import { FormEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Page() {
  const handleNotice = useHandleNotice();
  const [bindToolData, setBindToolData] = useState<BindToolDataItem>({
    ReceiptorId: "",
    LabelCode: "",
    LabelId: "",
    LabelSn: "",
    ToolSn: "",
  });
  const [eLabeList, setELabelList] = useState<LabelItem[]>([]);
  const [toolList, setToolList] = useState<ToolStockItem[]>([]);
  const [userList, setUserList] = useState<UserAccountItem[]>([]);
  const [inputUnbindTool, setInputUnbindTool] = useState<string>("");
  const [inputUnbindLabel, setInputUnbindLabel] = useState<string>("");
  const [selectLabel, setSelectLabel] = useState<number>(-1);
  const [selectTool, setSelectToll] = useState<number>(-1);

  const getELabelList = async () => {
    setELabelList(filterUnbindLabel(await apiGetELabelList()));
  };

  const getToolList = async () => {
    setToolList(filterToolStatus(await apiGetToolStockList(0)));
  };

  const getUserList = async () => {
    setUserList(await apiGetUserInfoList());
  };

  const postBindTool = async (e: FormEvent) => {
    e.preventDefault();
    const reqInt = await apiBindELabelInfo(bindToolData);
    if (reqInt === 0) {
      getELabelList();
      getToolList();
      cleanBindToolData();
      cleanSelectData();
      handleNotice("success", true, "綁定成功");
    } else {
      handleNotice("error", true, `綁定失敗。errorCode = ${reqInt}`);
    }
  };

  const cleanBindToolData = () => {
    setBindToolData({
      ReceiptorId: "",
      LabelCode: "",
      LabelId: "",
      LabelSn: "",
      ToolSn: "",
    });
  };

  const cleanSelectData = () => {
    setSelectLabel(-1);
    setSelectToll(-1);
  };

  const filterUnbindLabel = (data: LabelItem[]) =>
    data.filter((item) => item.BindStatus === "Unbinding");

  const filterToolStatus = (data: ToolStockItem[]) =>
    data.filter(
      (item) =>
        item.LifeStatus === "Normal" && item.PositionData.PositionStatus === 0
    );

  const searchUnbindTool = async (e: FormEvent) => {
    e.preventDefault();

    const toolData = await apiGetToolStockList(0);

    if (toolData) {
      const filterData = toolData.filter((item: ToolStockItem) => {
        return (
          item.ToolTypeData.Name.includes(inputUnbindTool) ||
          item.ToolSn.includes(inputUnbindTool) ||
          item.ToolSpecName.includes(inputUnbindTool)
        );
      });
      setToolList(filterToolStatus(filterData));
    }
  };

  const searchUnbindLabel = async (e: FormEvent) => {
    e.preventDefault();

    const data = await apiGetELabelList();
    if (data) {
      const filterData = data.filter((item: LabelItem) => {
        return (
          item.LabelId.toLowerCase().includes(inputUnbindLabel.toLowerCase()) ||
          item.LabelSn.toLowerCase().includes(
            inputUnbindLabel.toLocaleLowerCase()
          )
        );
      });
      setELabelList(filterUnbindLabel(filterData));
    }
  };

  const handleClickBindData = (params: {
    key: string;
    index: number;
    LabelId?: string;
    LabelCode?: string;
    LabelSn?: string;
    ToolSn?: string;
  }) => {
    const { key, index, LabelId, LabelCode, LabelSn, ToolSn } = params;

    if (key === "eLabel" && LabelId && LabelCode && LabelSn) {
      setBindToolData((prev) => ({ ...prev, LabelId: LabelId }));
      setBindToolData((prev) => ({ ...prev, LabelSn: LabelSn }));
      setBindToolData((prev) => ({ ...prev, LabelCode: LabelCode }));
      setSelectLabel(index);
    }
    if (key === "tool" && ToolSn) {
      setBindToolData((prev) => ({ ...prev, ToolSn: ToolSn }));
      setSelectToll(index);
    }
  };

  const handleInputBindData = (key: string, value: string | number) => {
    setBindToolData((prev) => ({ ...prev, [key]: value }));
  };

  const hintLabelCodeImage = () => {
    Swal.fire({
      title: "看這邊😀",
      imageUrl: "/label hint.png",
      imageWidth: 500,
      imageHeight: 300,
      imageAlt: "Custom image",
    });
  };

  useEffect(() => {
    getELabelList();
    getToolList();
    getUserList();
  }, []);

  return (
    <div className="relative p-2 ">
      <div className="sticky p-2 my-4 bg-gray-900 rounded-md top-4 ">
        <h3 className="text-center ">領取刀具</h3>
        <Form
          postBindTool={postBindTool}
          bindToolData={bindToolData}
          hintLabelCodeImage={hintLabelCodeImage}
          handleInputBindData={handleInputBindData}
          userList={userList}
        />
      </div>
      {/* label */}
      <div className="flex gap-4 ">
        <UnBindLabel
          searchUnbindLabel={searchUnbindLabel}
          inputUnbindLabel={inputUnbindLabel}
          setInputUnbindLabel={setInputUnbindLabel}
          eLabeList={eLabeList}
          selectLabel={selectLabel}
          handleClickBindData={handleClickBindData}
        />
        {/* tool */}
        <UnbindTool
          searchUnbindTool={searchUnbindTool}
          inputUnbindTool={inputUnbindTool}
          setInputUnbindTool={setInputUnbindTool}
          toolList={toolList}
          selectTool={selectTool}
          handleClickBindData={handleClickBindData}
        />
      </div>
    </div>
  );
}
