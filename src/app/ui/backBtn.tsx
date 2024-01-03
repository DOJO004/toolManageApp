interface BackBtnProps {
  backFunction?: () => void;
}
const BackBtn = ({ backFunction }: BackBtnProps) => {
  return (
    <p
      className="text-xl font-bold text-white cursor-pointer "
      onClick={() => backFunction()}
    >
      ←
    </p>
  );
};
export default BackBtn;
