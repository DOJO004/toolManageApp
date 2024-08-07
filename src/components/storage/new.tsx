import { NewStorageItem } from "@/scripts/Apis/toolInfo/types";
import { FormEvent } from "react";
import SubmitButton from "../buttons";

interface Props {
  postStorage: (e: FormEvent) => void;
  newStorage: NewStorageItem;
  handleChangeNewStorage: (key: string, value: string) => void;
  isPending: boolean;
}

export default function StorageNew({
  postStorage,
  newStorage,
  handleChangeNewStorage,
  isPending,
}: Props) {
  return (
    <div className="p-4 bg-gray-900 rounded-md">
      <h2>新增倉儲</h2>
      <form onSubmit={(e) => postStorage(e)}>
        <div className="flex w-full gap-2 ">
          <div className="w-full">
            <label htmlFor="StorageId">ID</label>
            <input
              type="number"
              name="StorageId"
              className="w-full p-2 text-center text-black rounded-md "
              id="StorageId"
              value={newStorage.StorageId}
              onChange={(e) =>
                handleChangeNewStorage("StorageId", e.target.value)
              }
            />
          </div>
          <div className="w-full">
            <label htmlFor="Name">倉儲名稱</label>
            <input
              type="text"
              name="Name"
              className="w-full p-2 text-center text-black rounded-md "
              id="Name"
              value={newStorage.Name}
              onChange={(e) => handleChangeNewStorage("Name", e.target.value)}
            />
          </div>
        </div>
        <SubmitButton
          name="新增"
          classNames="w-full p-2 mt-4 bg-indigo-500 rounded-md"
          onclick={() => {}}
          isPending={isPending}
        />
      </form>
    </div>
  );
}
