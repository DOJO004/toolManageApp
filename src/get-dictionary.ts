const dictionaries: Record<string, () => Promise<any>> = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  "zh-tw": () =>
    import("./dictionaries/zh-tw.json").then((module) => module.default),
  "zh-cn": () =>
    import("./dictionaries/zh-cn.json").then((module) => module.default),
};

export const getDictionary = async (locale: string): Promise<any> => {
  try {
    const dictionaryLoader = dictionaries[locale] ?? dictionaries["en"];
    return await dictionaryLoader();
  } catch (error) {
    console.error(`Failed to load dictionary for locale '${locale}':`, error);
    throw new Error(`Failed to load dictionary for locale '${locale}'`);
  }
};
