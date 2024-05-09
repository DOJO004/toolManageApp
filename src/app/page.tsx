import Login from "../components/login/login";

export default function Home() {
  return (
    <div className="flex flex-col items-center mt-40">
      <h1 className="my-4 ">
        WELCOME TO <span className="text-blue-500">DLCTEK</span>
      </h1>
      <Login />
    </div>
  );
}
