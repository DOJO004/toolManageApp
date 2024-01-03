import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center mt-40">
      <div>
        <p className="text-2xl">
          WELCOME BACK
          <span className="block text-4xl text-blue-400 md:inline md:mx-2">
            DLCTEK
          </span>
        </p>
      </div>
      <div className="px-12 py-4 my-4 text-xl bg-blue-500 rounded-xl">
        <Link href="/tool-manager/login">Login</Link>
      </div>
    </div>
  );
}
