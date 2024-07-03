const dictionaries: Record<string, () => Promise<any>> = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  "zh-TW": () =>
    import("./dictionaries/zh-TW.json").then((module) => module.default),
  "zh-CN": () =>
    import("./dictionaries/zh-CN.json").then((module) => module.default),
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
