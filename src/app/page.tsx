import Login from "./components/login/login";

export default function Home() {
  return (
    <div className="flex flex-col items-center mt-40">
      <h1 className="my-4 ">
        WELCOME TO <span className="text-blue-500">DLCTEK</span>
      </h1>
      <Login />
      {/* <Link href="/tool-manager/tool-info">
        <p className="px-12 py-4 my-4 text-xl bg-blue-500 rounded-xl">
          Get Start
        </p>
      </Link> */}
    </div>
  );
}
