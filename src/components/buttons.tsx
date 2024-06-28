interface Props {
  name: string;
  classNames: string;
  onclick: () => void;
  isPending: boolean;
}

export default function SubmitButton({
  name,
  classNames,
  onclick,
  isPending,
}: Props) {
  return (
    <button
      className={`${classNames} ${isPending ? "bg-indigo-900" : ""}`}
      onClick={() => onclick()}
      disabled={isPending}
    >
      {name}
    </button>
  );
}
