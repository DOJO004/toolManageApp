interface ToolTypeEditProps {
  toolTypeID: string;
  setToolTypeID: React.Dispatch<React.SetStateAction<string>>;
  toolTypeName: string;
  setToolTypeName: React.Dispatch<React.SetStateAction<string>>;
  fetchEditToolType: (e: FormEvent) => void;
  notice: boolean;
  isError: boolean;
}

const ToolTypeEdit = ({
  toolTypeID,
  setToolTypeID,
  toolTypeName,
  setToolTypeName,
  fetchEditToolType,
  notice,
  isError,
}: ToolTypeEditProps) => {
  return (
    <form
      className="flex flex-col justify-center w-full p-4 bg-gray-900 rounded-xl"
      onSubmit={(e) => fetchEditToolType(e)}
    >
      <p className="text-center">新增刀具類型</p>
      {notice && <Notice isError={isError} />}
      <input
        type="text"
        className="block pl-2 my-2 text-black rounded-md min-h-10 min-w-72"
        placeholder="刀具ID"
        value={toolTypeID}
        onChange={(e) => setToolTypeID(e.target.value)}
      />
      <input
        type="text"
        className="block pl-2 my-2 text-black rounded-md min-h-10 min-w-72"
        placeholder="刀具類型名稱"
        value={toolTypeName}
        onChange={(e) => setToolTypeName(e.target.value)}
      />
      <button className="p-2 bg-blue-500 rounded-md min-w-72 ">新增</button>
    </form>
  );
};

export default ToolTypeEdit;
