"use client";
import { LangContext } from "@/components/context/langContext";
import { getDictionary } from "@/get-dictionary";
import { Roboto_Condensed } from "next/font/google";
import { useEffect, useState } from "react";
import "./globals.css";

const roboto = Roboto_Condensed({ subsets: ["latin"] });

export default function Layout(props: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const [dict, setDict] = useState<any>(null);
  useEffect(() => {
    async function fetchDictionary() {
      const dictionary = await getDictionary(props.params.lang);
      setDict(dictionary);
    }
    fetchDictionary();
  }, [props.params.lang]);

  return (
    <html lang={props.params.lang}>
      <body className={`${roboto.className} px-4 `}>
        <LangContext.Provider value={dict}>
          {props.children}
        </LangContext.Provider>
      </body>
    </html>
  );
}
