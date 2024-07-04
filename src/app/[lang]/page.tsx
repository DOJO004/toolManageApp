import { getDictionary } from "@/get-dictionary";
import Login from "../../components/login/login";

interface Props {
  params: {
    lang: string;
  };
}

export default async function Page({ params: { lang } }: Props) {
  const dict = await getDictionary(lang);
  return (
    <div className="flex flex-col items-center mt-40">
      <h1 className="my-4 ">
        {dict.root.welcome}
        <span className="text-blue-500">{dict.root.name}</span>
      </h1>
      <Login />
    </div>
  );
}
