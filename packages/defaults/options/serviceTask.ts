import type { BpmnFormColumnItem } from "~/types";

export const serviceTaskColumn: BpmnFormColumnItem[] = [
  {
    label: "类",
    prop: "class"
  },
  {
    label: "异步",
    prop: "async",
    type: "switch",
    dicData: [
      { label: "否", value: "false" },
      { label: "是", value: "true" }
    ]
  }
];
