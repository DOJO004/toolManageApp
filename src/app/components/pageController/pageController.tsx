interface PageControllerProps {
  totalRecords: number;
  currentPage: number;
  totalPage: number;
  nextPage: () => void;
  exPage: () => void;
}
const PageController = ({
  totalRecords,
  currentPage,
  totalPage,
  nextPage,
  exPage,
}: PageControllerProps) => {
  return (
    <div className="flex items-center justify-between w-full mt-1 bg-gray-900 rounded-xl ">
      <div className="mx-4 text-sm">
        <div>總數：{totalRecords}</div>
      </div>
      <div className="flex">
        <div
          className={`mx-4  ${
            currentPage <= 1 ? " text-gray-500" : "cursor-pointer"
          }`}
          onClick={() => currentPage > 1 && exPage()}
        >
          ＜
        </div>

        <div>{currentPage}/</div>
        <div>{totalPage}</div>
        <div
          className={`mx-4  ${
            currentPage >= totalPage ? " text-gray-500" : "cursor-pointer"
          }`}
          onClick={() => currentPage < totalPage && nextPage()}
        >
          ＞
        </div>
      </div>
    </div>
  );
};

export default PageController;
