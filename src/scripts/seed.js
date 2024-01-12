import { apiAddToolTypeInfo, apiAddProductLineInfo } from "@/scripts/api"

// add tool type
const addToolTypeItem = [
  {
    ToolTypeID: "End Mills",
    Name: "平頭銑刀",
  },
  {
    ToolTypeID: "T-slot Cutters",
    Name: "T型槽銑刀",
  },
  {
    ToolTypeID: "Face Mills",
    Name: "面銑刀",
  },
  {
    ToolTypeID: "Shell Mills",
    Name: "拉刀",
  },
  {
    ToolTypeID: "Ball End Mills",
    Name: "球頭銑刀",
  },
];

export function PostAddToolTypeInfo() {
  for (let i = 0; i <= addToolTypeItem.length; i++) {
    apiAddToolTypeInfo(addToolTypeItem[i].ToolTypeID, addToolTypeItem[i].Name)
    console.log("add tool type info ", i);
  }
}

// add product lin
const addProductLine = [
  {
    "ProductLineID": "product line A",
    "ProductLineName": "生產線A"
  },
  {
    "ProductLineID": "product line B",
    "ProductLineName": "生產線B"
  },
  {
    "ProductLineID": "product line C",
    "ProductLineName": "生產線C"
  },
  {
    "ProductLineID": "product line D",
    "ProductLineName": "生產線D"
  },
  {
    "ProductLineID": "product line E",
    "ProductLineName": "生產線E"
  },
]

export async function PostAddProductLineInfo() {
  for (let i = 0; i <= addProductLine.length; i++) {
    await apiAddProductLineInfo(addProductLine[i].ProductLineID, addProductLine[i].ProductLineName)
    console.log("add product line info ", i);
  }
}