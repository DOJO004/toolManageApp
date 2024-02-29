import { apiNewMachineType } from "@/scripts/apis/machine-type";
import { FormEvent, useState } from "react";

interface MachineTypeNewProps {
  fetchGetMachineTypeList: () => void;
}

export default function MachineTypeNew({
  fetchGetMachineTypeList,
}: MachineTypeNewProps) {
  const [newMachineType, setNewMachineType] = useState({
    Id: "",
    Name: "",
  });

  const fetchNewMachineType = async (e: FormEvent) => {
    e.preventDefault();
    const res = await apiNewMachineType(newMachineType);
    const reqInt = res?.data?.Values?.ReqInt;
    console.log(res);

    if (reqInt === 0) {
      setNewMachineType({
        Id: "",
        Name: "",
      });
      fetchGetMachineTypeList();
    }
  };

  const handleNewInput = (name: string, value: string) => {
    setNewMachineType((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <form
      onSubmit={(e) => fetchNewMachineType(e)}
      className="pb-4 my-4 border-b-2"
    >
      <p className="text-xl text-center ">new machine type</p>
      <input
        type="text"
        className="my-2 input"
        placeholder="ID"
        value={newMachineType.Id}
        onChange={(e) => handleNewInput("Id", e.target.value)}
      />
      <input
        type="text"
        className="my-2 input"
        placeholder="Name"
        value={newMachineType.Name}
        onChange={(e) => handleNewInput("Name", e.target.value)}
      />
      <button className="w-full p-1 bg-indigo-500 rounded-md">送出</button>
    </form>
  );
}
