"use client";

import { confirmDisable } from "@/scripts/apis/base";
import {
  apiDisabledToolTypeInfo,
  apiModifyToolTypeInfo,
} from "@/scripts/apis/tool-info";
import React, { useState } from "react";

interface ToolTypeItem {
  Id: string;
  Name: string;
}

interface ToolTypeDataProps {
  fetchGetToolTypeList: () => void;
  toolTypeList: ToolTypeItem[];
}

const ToolTypeIndex = ({
  fetchGetToolTypeList,
  toolTypeList,
}: ToolTypeDataProps) => {
  const [editToolTypeInfo, setEditToolTypeInfo] = useState({
    id: "",
    name: "",
  });
  const [editToolTypeToggle, setEditToolTypeToggle] = useState(false);
  const [editToolTypeIndex, setEditToolTypeIndex] = useState(-1);

  const handleEditToolType = (
    status: string,
    index?: number,
    id?: string,
    name?: string
  ) => {
    if (status === "edit") {
      setEditToolTypeIndex(index!);
      setEditToolTypeToggle(true);
      setEditToolTypeInfo({
        id: id!,
        name: name!,
      });
    } else if (status === "submit") {
      fetchEditToolType();
    } else if (status === "delete") {
      fetch;
    }
  };

  const fetchEditToolType = async () => {
    const res = await apiModifyToolTypeInfo(
      editToolTypeInfo.id,
      editToolTypeInfo.name
    );
    if (res?.data?.Values.ReqInt === 0) {
      fetchGetToolTypeList();
      setEditToolTypeToggle(false);
    } else {
      console.log("edit tool type false...");
    }
  };

  const fetchDisableToolType = async (id: string) => {
    const confirm = confirmDisable();
    if (confirm) {
      await apiDisabledToolTypeInfo(id);
      setEditToolTypeToggle(false);
      fetchGetToolTypeList();
    }
  };

  const handleEditToolTypeInput = (value: string) => {
    setEditToolTypeInfo((prev) => ({
      ...prev,
      name: value,
    }));
  };

  return (
    <div className="grid items-center grid-cols-3 gap-2">
      {toolTypeList?.map((item, index) =>
        editToolTypeToggle && editToolTypeIndex === index ? (
          <React.Fragment key={item.Id}>
            <div>
              <input
                type="text"
                value={editToolTypeInfo.id}
                className="text-center input"
                readOnly
              />
            </div>
            <div>
              <input
                type="text"
                value={editToolTypeInfo.name}
                className="text-center input "
                onChange={(e) => handleEditToolTypeInput(e.target.value)}
                autoFocus
              />
            </div>
            <div>
              <button
                className="mx-2"
                onClick={() => handleEditToolType("submit")}
              >
                完成
              </button>
              <button
                className="mx-2"
                onClick={() => fetchDisableToolType(editToolTypeInfo.id)}
              >
                刪除
              </button>
            </div>
          </React.Fragment>
        ) : (
          <div
            key={item.Id}
            className="grid items-center grid-cols-3 gap-2 even:bg-gray-700"
          >
            <div className="p-1 whitespace-nowrap">{item.Id}</div>
            <div className="p-1 whitespace-nowrap">{item.Name}</div>
            <div className="cursor-pointer whitespace-nowrap">
              <button
                onClick={() =>
                  handleEditToolType("edit", index, item.Id, item.Name)
                }
              >
                編輯
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ToolTypeIndex;
