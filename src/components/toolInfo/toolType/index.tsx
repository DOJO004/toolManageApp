"use client";
import {
  apiDeleteToolType,
  apiEditToolType,
  apiGetToolTypeList,
} from "@/scripts/Apis/toolType/toolTypeApi";
import { useEffect, useState } from "react";
import SweetAlert from "../../sweetAlert";
import { NewToolType } from "./new";
import {
  DeleteToolTypeResponse,
  GetToolTypeListResponse,
  PatchToolTypeResponse,
  ToolTypeItem,
} from "./types";

export function ToolTypeIndex() {
  const [toolTypeList, setToolTypeList] = useState<ToolTypeItem[]>([]);
  const [newToolTypeMode, setNewToolTypeMode] = useState(false);
  const [editToolTypeMode, setEditToolTypeMode] = useState(false);
  const [editToolTypeModeIndex, setEditToolTypeModeIndex] = useState(-1);
  const [editToolType, setEditToolType] = useState<ToolTypeItem>({
    Id: "",
    Name: "",
  });

  const getToolTypeList = async (count = 0) => {
    if (count === 3) {
        SweetAlert(-99, "請求失敗，請重新整理頁面。");
        return;
    }
    try {
        const data = await apiGetToolTypeList();
        const res = data as GetToolTypeListResponse;
        console.log(`tool type list`, res);

        if (res?.data?.Values?.ReqInt === 0) {
            setToolTypeList(res.data.Values.ToolTypeMenus);
            return res.data.Values.ToolTypeMenus;
        } else {
            console.log(`ReqInt = ${res.data.Values.ReqInt}`);
        }
    } catch (error) {
        console.error("Error", error);
        console.log(count);
        // 等待秒一後再次嘗試
        setTimeout(() => {
            getToolTypeList(count + 1);
        }, 1000);
    }
};


  const patchEditToolType = async () => {
    const data = await apiEditToolType(editToolType);
    const res = data as PatchToolTypeResponse;
    const reqInt = res.data.Values.ReqInt;
    if (reqInt === 0) {
      setEditToolTypeMode(false);
      getToolTypeList();
      SweetAlert(reqInt, "更新成功");
    } else {
      SweetAlert(reqInt, "更新失敗");
    }
  };

  const deleteToolType = async (item: ToolTypeItem) => {
    console.log(item);

    const confirm = window.confirm(`確定刪除 ${item.Name} 嗎?`);
    if (confirm) {
      const data = await apiDeleteToolType(item.Id);
      const res = data as DeleteToolTypeResponse;
      if (res.data.Values.ReqInt === 0) {
        getToolTypeList();
        setEditToolTypeMode(false);
      }
    }
  };

  let timer: ReturnType<typeof setTimeout>;

  const filterToolTypeList = async (value: string) => {
    clearTimeout(timer);

    timer = setTimeout(async () => {
      const data: ToolTypeItem[] | undefined = await getToolTypeList();

      if (data) {
        const filterData = data.filter((item) => {
          return (
            item.Name.toLowerCase().includes(value.toLowerCase()) ||
            item.Id.toLowerCase().includes(value.toLowerCase())
          );
        });
        console.log("filter data", filterData);

        setToolTypeList(filterData);
      } else {
        console.log("获取工具类型列表失败或返回的数据为空");
      }
    }, 500);
  };

  const handleClickNewToolType = () => {
    setEditToolTypeMode(false);
    setNewToolTypeMode(!newToolTypeMode);
  };

  const handleClickEditToolType = (item: ToolTypeItem, index: number) => {
    setNewToolTypeMode(false);
    setEditToolTypeMode(true);
    setEditToolTypeModeIndex(index);
    setEditToolType({
      Id: item.Id,
      Name: item.Name,
    });
  };

  useEffect(() => {
    getToolTypeList();
  }, []);

  return (
    <div className="w-full">
      {/* index */}
      <div className="w-full py-4 ">
        <div className="relative ">
          <button
            className="absolute top-0 right-0 p-2 border rounded-md hover:bg-gray-600 "
            onClick={() => handleClickNewToolType()}
          >
            新增
          </button>
          <h2 className="text-center ">刀具類型</h2>

          {/* new */}
          <div
            className={`overflow-hidden relative transition-all my-4  duration-300 ease-in-out ${
              newToolTypeMode ? "h-48" : "h-0"
            }`}
          >
            <button
              className="absolute top-0 p-2 transition-all duration-300 right-5 hover:rounded-full hover:bg-gray-900"
              onClick={() => handleClickNewToolType()}
            >
              X
            </button>
            <NewToolType getToolTypeList={getToolTypeList} />
          </div>
          {/* search */}
          <input
            type="search"
            className="flex p-2 mx-auto my-2 text-black rounded-md w-96 "
            placeholder="請輸入搜尋關鍵字"
            onChange={(e) => filterToolTypeList(e.target.value)}
          />
        </div>
        <div className="mx-auto overflow-auto bg-gray-800 rounded-md ">
          <div className="grid grid-cols-3 gap-2 text-center bg-indigo-500 ">
            <p className="p-1 whitespace-nowrap">ID</p>
            <p className="p-1 whitespace-nowrap">名稱</p>
            <p className="p-1 whitespace-nowrap">編輯</p>
          </div>
            {toolTypeList.length > 0 ? (
              // edit mode
              toolTypeList.map((item, index) =>
                editToolTypeMode && index === editToolTypeModeIndex ? (
                  <div className="grid grid-cols-3 text-center" key={item.Id}>
                    <p className="p-1">{item.Id}</p>
                    <p className="p-1">
                      <input
                        autoFocus
                        type="text"
                        className="w-full mx-auto text-center text-black border rounded-md"
                        value={editToolType.Name}
                        onChange={(e) =>
                          setEditToolType({
                            ...editToolType,
                            Name: e.target.value,
                          })
                        }
                      />
                    </p>
                    <p className="p-1">
                      <span
                        className="p-1 bg-green-500 rounded-md cursor-pointer hover:bg-green-600"
                        onClick={() => patchEditToolType()}
                      >
                        完成
                      </span>
                      <span className="mx-2">/</span>
                      <span
                        className="p-1 bg-red-500 rounded-md cursor-pointer hover:bg-red-600"
                        onClick={() => deleteToolType(item)}
                      >
                        刪除
                      </span>
                    </p>
                  </div>
                ) : (
                  // render data
                  <div className="grid grid-cols-3 text-center" key={item.Id}>
                    <p className="p-1">{item.Id}</p>
                    <p className="p-1">{item.Name}</p>
                    <p onClick={() => handleClickEditToolType(item, index)}>
                      <button className="p-1 rounded-md hover:bg-indigo-600 ">
                        編輯
                      </button>
                    </p>
                  </div>
                )
              )
            ) : (
              <div>no data...</div>
            )}
          </div>
      </div>
    </div>
  );
}
