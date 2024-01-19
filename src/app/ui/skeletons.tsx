import exp from "constants";

export function DashboardCardSkeleton() {
  return (
    <div className="p-2 m-2 bg-gray-900 border rounded-md h-fit w-96">
      <div className="flex justify-between ">
        <div>
          <div className="w-24 h-6 my-2 bg-gray-500 rounded-xl"></div>
          <div className="w-20 h-6 my-2 bg-gray-500 rounded-xl"></div>
          <div className="w-12 h-6 my-2 bg-gray-500 rounded-xl"></div>
        </div>
        <div>
          <div className="w-6 h-6 my-2 bg-gray-500 rounded-full"></div>
          <div className="w-16 h-6 my-2 bg-gray-500 rounded-xl"></div>
          <div className="w-12 h-6 my-2 bg-gray-500 rounded-xl"></div>
        </div>
      </div>
      <hr className="my-2" />
      <div className="flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-gray-500 rounded-full"></div>
        <div className="w-24 h-12 bg-gray-500 rounded-md "></div>
      </div>
    </div>
  );
}

export function ReceiveToolSkeleton() {
  return (
    <div className="bg-gray-900 border rounded-md h-fit">
      <div className="w-12 h-8 mx-auto my-2 bg-gray-500 rounded-xl"></div>
      <div className="w-12 h-8 my-2 ml-6 bg-gray-500 rounded-xl"></div>
      <div className="h-8 my-2 ml-6 bg-gray-500 w-80 rounded-xl"></div>
      <div className="w-12 h-8 my-2 ml-6 bg-gray-500 rounded-xl"></div>
      <div className="h-8 my-2 ml-6 bg-gray-500 w-80 rounded-xl"></div>
      <div className="w-12 h-8 my-2 ml-6 bg-gray-500 rounded-xl"></div>
      <div className="h-8 my-2 ml-6 bg-gray-500 w-80 rounded-xl"></div>
      <div className="h-8 my-4 ml-6 bg-gray-500 w-80 rounded-xl"></div>
    </div>
  );
}

export function RepairAndScrapSkeletons() {
  return (
    <div className="w-full py-4 bg-gray-900 border-b-2 rounded-md h-fit">
      <div className="w-3/12 h-6 mx-auto my-2 bg-gray-500 rounded-xl"></div>
      <div className="w-6/12 h-6 mx-auto my-2 bg-gray-500 rounded-xl "></div>
      <hr className="my-4" />
      <div className="w-4/12 h-6 my-2 ml-4 bg-gray-500 rounded-xl "></div>
      <div className="w-3/12 h-6 my-2 ml-4 bg-gray-500 rounded-xl"></div>
      <div className="grid grid-cols-5 gap-2 mx-2 ">
        <div className="w-full h-6 mx-auto bg-gray-500 rounded-xl"></div>
        <div className="w-full h-6 mx-auto bg-gray-500 rounded-xl"></div>
        <div className="w-full h-6 mx-auto bg-gray-500 rounded-xl"></div>
        <div className="w-full h-6 mx-auto bg-gray-500 rounded-xl"></div>
        <div className="w-full h-6 mx-auto bg-gray-500 rounded-xl"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-xl"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-xl"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-xl"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-xl"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-xl"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-xl"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-xl"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-xl"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-xl"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-xl"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-xl"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-xl"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-xl"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-xl"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-xl"></div>
      </div>
    </div>
  );
}

export function ToolTypeSkeletons() {
  return (
    <div className="w-full p-2 bg-gray-900 rounded-md h-fit">
      <div className="w-4/12 h-6 mx-auto my-2 bg-gray-500 rounded-md "></div>
      <hr className="my-4 " />
      <div className="grid grid-cols-3 gap-2 my-2 ">
        <div className="w-full h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-full h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-full h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
      </div>
    </div>
  );
}

export function ToolSpecSkeletons() {
  return (
    <div className="w-full p-2 bg-gray-900 rounded-md h-fit">
      <div className="w-3/12 h-6 mx-auto my-2 bg-gray-500 rounded-md "></div>
      <hr className="my-4" />
      <div className="grid grid-cols-12 gap-2 ">
        <div className="w-full h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-full h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-full h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-full h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-full h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-full h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-full h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-full h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-full h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-full h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-full h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-full h-6 mx-auto bg-gray-500 rounded-md"></div>
      </div>
      <div className="grid grid-cols-12 gap-2 my-2 ">
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
      </div>
    </div>
  );
}

export function ToolStockSkeletons() {
  return (
    <div className="p-4 bg-gray-900 rounded-md">
      <div className="w-3/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
      <hr className="my-4" />
      <div className="grid grid-cols-7 gap-2 ">
        <div className="w-full h-6 bg-gray-500 rounded-md "></div>
        <div className="w-full h-6 bg-gray-500 rounded-md "></div>
        <div className="w-full h-6 bg-gray-500 rounded-md "></div>
        <div className="w-full h-6 bg-gray-500 rounded-md "></div>
        <div className="w-full h-6 bg-gray-500 rounded-md "></div>
        <div className="w-full h-6 bg-gray-500 rounded-md "></div>
        <div className="w-full h-6 bg-gray-500 rounded-md "></div>
      </div>
      <div className="grid grid-cols-7 gap-2 my-2 ">
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
      </div>
    </div>
  );
}

export function ProductLineSkeletons() {
  return (
    <div className="p-4 bg-gray-900 rounded-md ">
      <div className="w-4/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
      <hr className="my-2" />
      <div className="grid grid-cols-3 gap-2">
        <div className="w-full h-6 bg-gray-500 rounded-md"></div>
        <div className="w-full h-6 bg-gray-500 rounded-md"></div>
        <div className="w-full h-6 bg-gray-500 rounded-md"></div>
      </div>
      <div className="grid grid-cols-3 gap-2 my-2">
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
      </div>
    </div>
  );
}

export function MachineTypeSkeletons() {
  return (
    <div className="p-4 bg-gray-900 rounded-md ">
      <div className="w-4/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
      <hr className="my-2" />
      <div className="grid grid-cols-3 gap-2">
        <div className="w-full h-6 bg-gray-500 rounded-md"></div>
        <div className="w-full h-6 bg-gray-500 rounded-md"></div>
        <div className="w-full h-6 bg-gray-500 rounded-md"></div>
      </div>
      <div className="grid grid-cols-3 gap-2 my-2">
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
      </div>
    </div>
  );
}

export function MachineSpecSkeletons() {
  return (
    <div className="p-4 bg-gray-900 rounded-md ">
      <div className="w-4/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
      <hr className="my-2" />
      <div className="grid grid-cols-10 gap-2">
        <div className="w-full h-6 bg-gray-500 rounded-md"></div>
        <div className="w-full h-6 bg-gray-500 rounded-md"></div>
        <div className="w-full h-6 bg-gray-500 rounded-md"></div>
        <div className="w-full h-6 bg-gray-500 rounded-md"></div>
        <div className="w-full h-6 bg-gray-500 rounded-md"></div>
        <div className="w-full h-6 bg-gray-500 rounded-md"></div>
        <div className="w-full h-6 bg-gray-500 rounded-md"></div>
        <div className="w-full h-6 bg-gray-500 rounded-md"></div>
        <div className="w-full h-6 bg-gray-500 rounded-md"></div>
        <div className="w-full h-6 bg-gray-500 rounded-md"></div>
      </div>
      <div className="grid grid-cols-10 gap-2 my-2">
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
      </div>
    </div>
  );
}

export function MachineInfoSkeletons() {
  return (
    <div>
      <div className="md:flex">
        <MachineInfoPieChartSkeletons />
        <MachineLogInfoSkeletons />
      </div>
      <MachineInfoTableSkeletons />
    </div>
  );
}

export function MachineLogInfoSkeletons() {
  return (
    <div className="w-full p-2 ml-2 bg-gray-900 rounded-md">
      <div className="w-4/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
      <hr className="my-4" />
      <div className="grid grid-cols-4 gap-2">
        <div className="w-full h-6 bg-gray-500 rounded-md "></div>
        <div className="w-full h-6 bg-gray-500 rounded-md "></div>
        <div className="w-full h-6 bg-gray-500 rounded-md "></div>
        <div className="w-full h-6 bg-gray-500 rounded-md "></div>
      </div>
      <div className="grid grid-cols-4 gap-2 my-2">
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
      </div>
    </div>
  );
}

export function MachineInfoPieChartSkeletons() {
  return (
    <div className="w-full p-2 mr-2 bg-gray-900 rounded-md h-fit">
      <div className="flex justify-between">
        <div className="w-full">
          <div className="w-4/12 h-6 my-2 bg-gray-500 rounded-md"></div>
          <div className="w-2/12 h-6 my-2 bg-gray-500 rounded-md"></div>
          <div className="w-1/12 h-6 my-2 bg-gray-500 rounded-md"></div>
        </div>
        <div className="w-3/12 h-6 my-2 bg-gray-500 rounded-md "></div>
      </div>
      <hr className="my-2" />
      <div className="flex justify-between w-full">
        <div className="w-24 h-20 bg-gray-500 rounded-full"></div>
        <div className="w-full p-2">
          <div className="w-4/12 h-4 my-2 ml-auto bg-gray-500 rounded-md "></div>
          <div className="w-2/12 h-4 my-2 ml-auto bg-gray-500 rounded-md "></div>
          <div className="w-4/12 h-4 my-2 ml-auto bg-gray-500 rounded-md "></div>
          <div className="w-2/12 h-4 my-2 ml-auto bg-gray-500 rounded-md "></div>
          <div className="w-4/12 h-4 my-2 ml-auto bg-gray-500 rounded-md "></div>
        </div>
      </div>
    </div>
  );
}

export function MachineInfoTableSkeletons() {
  return (
    <div className="w-full p-4 my-2 bg-gray-900 rounded-md h-fit">
      <div className="w-4/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
      <hr className="my-4" />
      <div className="grid grid-cols-6 gap-2">
        <div className="w-full h-6 bg-gray-500 rounded-md"></div>
        <div className="w-full h-6 bg-gray-500 rounded-md"></div>
        <div className="w-full h-6 bg-gray-500 rounded-md"></div>
        <div className="w-full h-6 bg-gray-500 rounded-md"></div>
        <div className="w-full h-6 bg-gray-500 rounded-md"></div>
        <div className="w-full h-6 bg-gray-500 rounded-md"></div>
      </div>
      <div className="grid grid-cols-6 gap-2 my-2">
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
      </div>
    </div>
  );
}

export function ELabelInfoSkeletons() {
  return (
    <div className="p-4 bg-gray-900 rounded-md ">
      <div className="w-4/12 h-6 mx-auto bg-gray-500 rounded-md"></div>
      <hr className="my-2" />
      <div className="grid grid-cols-7 gap-2 ">
        <div className="w-full h-6 bg-gray-500 rounded-md "></div>
        <div className="w-full h-6 bg-gray-500 rounded-md "></div>
        <div className="w-full h-6 bg-gray-500 rounded-md "></div>
        <div className="w-full h-6 bg-gray-500 rounded-md "></div>
        <div className="w-full h-6 bg-gray-500 rounded-md "></div>
        <div className="w-full h-6 bg-gray-500 rounded-md "></div>
        <div className="w-full h-6 bg-gray-500 rounded-md "></div>
      </div>
      <div className="grid grid-cols-7 gap-2 my-2 ">
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
      </div>
      <div className="w-2/12 h-6 mx-auto my-6 bg-gray-500 rounded-md"></div>
    </div>
  );
}

export function UserInfoSkeletons() {
  return (
    <div className="p-4 bg-gray-900 rounded-md ">
      <div className="w-3/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
      <hr className="my-4" />
      <div className="grid grid-cols-8 gap-2">
        <div className="w-full h-6 bg-gray-500 rounded-md "></div>
        <div className="w-full h-6 bg-gray-500 rounded-md "></div>
        <div className="w-full h-6 bg-gray-500 rounded-md "></div>
        <div className="w-full h-6 bg-gray-500 rounded-md "></div>
        <div className="w-full h-6 bg-gray-500 rounded-md "></div>
        <div className="w-full h-6 bg-gray-500 rounded-md "></div>
        <div className="w-full h-6 bg-gray-500 rounded-md "></div>
        <div className="w-full h-6 bg-gray-500 rounded-md "></div>
      </div>
      <div className="grid grid-cols-8 gap-2 my-2">
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
        <div className="w-10/12 h-6 mx-auto bg-gray-500 rounded-md "></div>
      </div>
    </div>
  );
}
