import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center mt-40">
      <div>
        <p className="text-2xl">
          WELCOME BACK TO
          <span className="block text-4xl text-blue-400 md:inline md:mx-2">
            DLCTEK
          </span>
        </p>
      </div>
      <Link href="/tool-manager/login">
        <p className="px-12 py-4 my-4 text-xl bg-blue-500 rounded-xl">Login</p>
      </Link>
      <Link href="/tool-manager/tool-info/tool-type">
        <p className="px-12 py-4 my-4 text-xl bg-blue-500 rounded-xl">
          Get Start
        </p>
      </Link>
    </div>
  );
}
