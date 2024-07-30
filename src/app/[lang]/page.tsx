"use client";
import { LangContext } from "@/components/context/langContext";
import Login from "@/components/login/login";
import DefaultSkeleton from "@/components/skeletons/default";
import { setCookie } from "@/scripts/Apis/mainApi";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Page() {
  const dict = useContext(LangContext);
  const getLang = useParams().lang;
  const initLang = typeof getLang === "string" ? getLang : getLang[0];

  const [lang, setLang] = useState<string>(initLang);
  const [showLangSelect, setShowLangSelect] = useState<boolean>(false);
  const router = useRouter();

  const handleLanguage = (v: string) => {
    setLang(v);
    setCookie("lang", v, 30);
    router.push(`/${v}`);
  };

  useEffect(() => {
    console.log(document.cookie);
  }, []);

  if (!dict) return <DefaultSkeleton />;
  return (
    <div className="relative flex flex-col items-center mt-40">
      <h1 className="my-4 ">
        {dict.root.welcome}
        <span className="text-blue-500">{dict.root.name}</span>
      </h1>
      <Login />1
      <div className="absolute top-0 right-5">
        <Image
          src="/images/icons/language.svg"
          alt="language icon"
          width={30}
          height={30}
          className="cursor-pointer hover:scale-110"
          onClick={() => setShowLangSelect(!showLangSelect)}
        />
        <select
          name=""
          id=""
          className={`text-black absolute top-8 right-0 ${showLangSelect ? "block" : "hidden"}`}
          value={lang}
          onChange={(e) => handleLanguage(e.target.value)}
        >
          <option value="en-us" className="text-black">
            en-us
          </option>
          <option value="zh-tw" className="text-black">
            zh-tw
          </option>
          <option value="zh-cn" className="text-black">
            zh-cn
          </option>
        </select>
      </div>
    </div>
  );
}
