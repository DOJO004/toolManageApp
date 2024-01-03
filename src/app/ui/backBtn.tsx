interface BackBtnProps {
  backFunction?: () => void;
}
const BackBtn = ({ backFunction }: BackBtnProps) => {
  return (
    <p className="text-xl font-bold text-white " onClick={() => backFunction()}>
      ←
    </p>
  );
};
export default BackBtn;
