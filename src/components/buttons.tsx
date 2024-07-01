import Image from "next/image";
import { FormEvent } from "react";

interface Props {
  name: string;
  classNames: string;
  onclick: (e: FormEvent) => void;
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
      onClick={(e) => onclick(e)}
      disabled={isPending}
    >
      {isPending ? (
        <Image
          src={"/icons/progress.svg"}
          alt="progress"
          width={30}
          height={30}
          className="mx-auto animate-spin"
        />
      ) : (
        name
      )}
    </button>
  );
}
