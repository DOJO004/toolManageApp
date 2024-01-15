interface ToolLifeItem {
    "ToolSN": string,
    "LifeStatus": string,
    "LifePercentage": number,
}

interface ToolStock {
    ToolType: string
    ToolLifeList: ToolLifeItem[]
}

export function handleToolType(toolStockList: ToolStock[]) {
    const res: Set<string> = new Set(
        toolStockList.map((tool: ToolStock) => tool.ToolType)
    );
    console.log(Array.from(res));

    return Array.from(res);
};

export function handleToolSN(toolStockList:ToolStock[], toolType:string) {
    const res = toolStockList
}