interface PageControllerProps {
  currentPage: number;
  totalPage: number;
  nextPage: () => void;
  exPage: () => void;
}
const PageController = ({
  currentPage,
  totalPage,
  nextPage,
  exPage,
}: PageControllerProps) => {
  return (
    <div className="flex justify-end">
      <p className="mx-4 cursor-pointer" onClick={() => exPage()}>
        ＜
      </p>
      <p>{currentPage}/</p>
      <p>{totalPage}</p>
      <p className="mx-4 cursor-pointer" onClick={() => nextPage()}>
        ＞
      </p>
    </div>
  );
};

export default PageController;
