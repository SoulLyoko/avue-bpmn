import { baseColumn } from "./base";
import { UserTaskSelect } from "~/components/user-task-select";

export const processColumn = [
  ...baseColumn.map(col => {
    return {
      ...col,
      label: col.label?.replace("节点", "流程")
    };
  }),
  {
    label: "跳过第一节点",
    prop: "skipFirstNode",
    labelWidth: 100,
    type: "switch",
    dicData: [
      { label: "否", value: "false" },
      { label: "是", value: "true" }
    ]
  },
  {
    label: "默认驳回节点",
    prop: "rollbackNode",
    type: "select",
    labelWidth: 100,
    component: UserTaskSelect
  }
];
