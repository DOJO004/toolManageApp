"use client"; // error component 必須是客戶端 component

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 將錯誤印出
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center mt-60">
      <div>
        <h2 className="text-4xl"> Something went wrong!</h2>
        <button
          className="flex p-2 mt-2 ml-auto bg-indigo-500 rounded-md hover:bg-indigo-600"
          onClick={
            // 嘗試渲染片段回復
            () => reset()
          }
        >
          Try again
        </button>
      </div>
    </div>
  );
}
