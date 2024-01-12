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
    <div className="flex items-center justify-between mt-1 bg-gray-900 rounded-xl ">
      <div className="mx-4 text-sm">
        <p>總數：{totalRecords}</p>
      </div>
      <div className="flex">
        <p
          className={`mx-4  ${
            currentPage <= 1 ? " text-gray-500" : "cursor-pointer"
          }`}
          onClick={() => currentPage > 1 && exPage()}
        >
          ＜
        </p>

        <p>{currentPage}/</p>
        <p>{totalPage}</p>
        <p
          className={`mx-4  ${
            currentPage >= totalPage ? " text-gray-500" : "cursor-pointer"
          }`}
          onClick={() => currentPage < totalPage && nextPage()}
        >
          ＞
        </p>
      </div>
    </div>
  );
};

export default PageController;
