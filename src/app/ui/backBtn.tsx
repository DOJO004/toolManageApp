interface BackBtnProps {
  backFunction?: () => void;
}
const BackBtn = ({ backFunction }: BackBtnProps) => {
  return (
    <button
      className="text-xl font-bold text-white "
      onClick={() => backFunction()}
    >
      ←
    </button>
  );
};
export default BackBtn;
