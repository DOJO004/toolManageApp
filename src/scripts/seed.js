import { apiAddToolTypeInfo } from "./apis/tool-info";
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

export function fakeAddToolTypeInfo() {
  for (let i = 0; i < addToolTypeItem.length; i++) {
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

// add tool spec 

const addToolSpecItems=[
  {
    "ToolSpecID": "toolSpecID-001",
    "Name": "toolSpecName-001",
    "ToolType": "End Mills",
    "Specification": {
      "BladeDiameter": 1,
      "BladeHeight": 1,
      "TotalLength": 1,
      "HandleDiameter": 1
    },
    "SafetyStock": 1,
    "MaxLife": {
      "ProcessCnt": 1,
      "ProcessTime": 1,
      "ProcessLength": 1,
      "RepairCnt": 1
    }
  },
  {
    "ToolSpecID": "toolSpecID-002",
    "Name": "toolSpecName-002",
    "ToolType": "End Mills",
    "Specification": {
      "BladeDiameter": 2,
      "BladeHeight": 2,
      "TotalLength": 2,
      "HandleDiameter":2
    },
    "SafetyStock": 2,
    "MaxLife": {
      "ProcessCnt": 2,
      "ProcessTime": 2,
      "ProcessLength": 2,
      "RepairCnt":2
    }
  },
  {
    "ToolSpecID": "toolSpecID-003",
    "Name": "toolSpecName-003",
    "ToolType": "End Mills",
    "Specification": {
      "BladeDiameter": 3,
      "BladeHeight": 3,
      "TotalLength": 3,
      "HandleDiameter":3
    },
    "SafetyStock": 3,
    "MaxLife": {
      "ProcessCnt": 3,
      "ProcessTime": 3,
      "ProcessLength": 3,
      "RepairCnt": 3
    }
  },
  {
    "ToolSpecID": "toolSpecID-004",
    "Name": "toolSpecName-004",
    "ToolType": "End Mills",
    "Specification": {
      "BladeDiameter": 4,
      "BladeHeight": 4,
      "TotalLength": 4,
      "HandleDiameter": 4
    },
    "SafetyStock": 4,
    "MaxLife": {
      "ProcessCnt": 4,
      "ProcessTime": 4,
      "ProcessLength": 4,
      "RepairCnt": 4
    }
  },
  {
    "ToolSpecID": "toolSpecID-005",
    "Name": "toolSpecName-005",
    "ToolType": "End Mills",
    "Specification": {
      "BladeDiameter": 5,
      "BladeHeight": 5,
      "TotalLength": 5,
      "HandleDiameter": 5
    },
    "SafetyStock": 5,
    "MaxLife": {
      "ProcessCnt": 5,
      "ProcessTime": 5,
      "ProcessLength": 5,
      "RepairCnt": 5
    }
  }
]

// add machine type

const addMachineTypeItem=[
  {
    "MachineTypeID": "MachineTypeID-001",
    "MachineTypeName": "MachineTypeName-001"
  },
  {
    "MachineTypeID": "MachineTypeID-002",
    "MachineTypeName": "MachineTypeName-002"
  },
  {
    "MachineTypeID": "MachineTypeID-003",
    "MachineTypeName": "MachineTypeName-003"
  },
  {
    "MachineTypeID": "MachineTypeID-004",
    "MachineTypeName": "MachineTypeName-004"
  },
  {
    "MachineTypeID": "MachineTypeID-005",
    "MachineTypeName": "MachineTypeName-005"
  },
]

// add machine spec 

const addMachineSpecItem=[
  {
    "ProductLineID": "product line A",
    "MachineTypeID": "MachineTypeID-001",
    "MachineSN": "MachineSN-001",
    "MachineName": "MachineName-001",
    "MachineIP": "192.168.10.01",
    "ReaderID": "ReaderID-001",
    "SystemInfo": {
      "Brand": 1,
      "Series": "0i",
      "MT": "M"
    },
    "AxisInfos": [
      {
        "AxisIndex": 1,
        "AxisName": "X_axis",
        "IsSpindle": true
      }
    ]
  },
  {
    "ProductLineID": "product line A",
    "MachineTypeID": "MachineTypeID-002",
    "MachineSN": "MachineSN-002",
    "MachineName": "MachineName-002",
    "MachineIP": "192.168.10.02",
    "ReaderID": "ReaderID-002",
    "SystemInfo": {
      "Brand": 2,
      "Series": "0i",
      "MT": "M"
    },
    "AxisInfos": [
      {
        "AxisIndex": 2,
        "AxisName": "X_axis",
        "IsSpindle": true
      }
    ]
  },
  {
    "ProductLineID": "product line A",
    "MachineTypeID": "MachineTypeID-003",
    "MachineSN": "MachineSN-003",
    "MachineName": "MachineName-003",
    "MachineIP": "192.168.10.03",
    "ReaderID": "ReaderID-003",
    "SystemInfo": {
      "Brand": 3,
      "Series": "0i",
      "MT": "M"
    },
    "AxisInfos": [
      {
        "AxisIndex": 3,
        "AxisName": "X_axis",
        "IsSpindle": true
      }
    ]
  },
  {
    "ProductLineID": "product line A",
    "MachineTypeID": "MachineTypeID-004",
    "MachineSN": "MachineSN-004",
    "MachineName": "MachineName-004",
    "MachineIP": "192.168.10.04",
    "ReaderID": "ReaderID-004",
    "SystemInfo": {
      "Brand": 4,
      "Series": "0i",
      "MT": "M"
    },
    "AxisInfos": [
      {
        "AxisIndex": 4,
        "AxisName": "X_axis",
        "IsSpindle": true
      }
    ]
  },
  {
    "ProductLineID": "product line A",
    "MachineTypeID": "MachineTypeID-007",
    "MachineSN": "MachineSN-007",
    "MachineName": "MachineName-007",
    "MachineIP": "192.168.10.07",
    "ReaderID": "ReaderID-007",
    "SystemInfo": {
      "Brand": 7,
      "Series": "0i",
      "MT": "M"
    },
    "AxisInfos": [
      {
        "AxisIndex": 7,
        "AxisName": "X_axis",
      "IsSpindle": true
      }
    ]
  },
]