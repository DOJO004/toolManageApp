interface NoticeProps {
  errorMessage?: string;
  successMessage?: string;
  isError: boolean;
}

interface ErrorMessage {
  errorMessage: string;
}

interface SuccessMessage {
  successMessage: string;
}

export function ErrorMessage({ errorMessage }: ErrorMessage) {
  return <p className="text-center text-red-500">{errorMessage}</p>;
}

export function SuccessMessage({ successMessage }: SuccessMessage) {
  return <p className="text-center text-green-500">{successMessage}</p>;
}

const Notice = ({
  errorMessage = "請檢查欄位在嘗試一次。",
  successMessage = "成功!",
  isError,
}: NoticeProps) => {
  return (
    <div>
      {isError ? (
        <ErrorMessage errorMessage={errorMessage} />
      ) : (
        <SuccessMessage successMessage={successMessage} />
      )}
    </div>
  );
};

export default Notice;
