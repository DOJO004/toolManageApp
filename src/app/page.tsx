import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center mt-40">
      <div>
        <p className="text-2xl">
          WELCOME BACK
          <span className="text-blue-400 text-4xl block md:inline md:mx-2">
            DLCTEK
          </span>
        </p>
      </div>
      <div className=" bg-blue-500 py-4 px-12 rounded-md my-4 text-xl">
        <Link href="/tool-manager/tool-status">Login</Link>
      </div>
    </div>
  );
}
