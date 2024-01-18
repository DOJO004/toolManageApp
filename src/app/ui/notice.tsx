import React, { useEffect } from "react";
import Image from "next/image";

interface ErrorMessage {
  errorMessage: string;
}

interface SuccessMessage {
  successMessage: string;
}

interface NoticeProps {
  errorMessage?: string;
  successMessage?: string;
  notice: boolean;
  setNotice: React.Dispatch<React.SetStateAction<boolean>>;
  isError: boolean;
}

export function ErrorMessage({ errorMessage }: ErrorMessage) {
  return <p className="text-center text-red-500">{errorMessage}</p>;
}

export function SuccessMessage({ successMessage }: SuccessMessage) {
  return <p className="text-center text-green-500">{successMessage}</p>;
}

const Notice = ({
  errorMessage = "請檢查欄位再試一次。",
  successMessage = "成功!",
  notice,
  setNotice,
  isError,
}: NoticeProps) => {
  useEffect(() => {
    setTimeout(() => {
      setNotice(false);
    }, 3000);
  }, [notice]);

  return (
    <div
      className={`absolute min-w-40 p-2 flex transition-all duration-300 items-center z-10  bg-gray-800 rounded-md top-5 right-4 border-l-4  ${
        notice ? "translate-y-0 " : "-translate-y-96"
      }`}
    >
      {isError ? (
        <Image
          src="/error.png"
          alt="error img"
          width={30}
          height={30}
          className="mr-4"
        />
      ) : (
        <Image
          src="/accept.png"
          alt="accept img"
          width={30}
          height={30}
          className="mr-4"
        />
      )}
      {isError ? (
        <ErrorMessage errorMessage={errorMessage} />
      ) : (
        <SuccessMessage successMessage={successMessage} />
      )}
    </div>
  );
};

export default Notice;
