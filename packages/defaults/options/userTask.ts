import type { BpmnFormColumnItem } from "~/types";

import { UserTaskSelect } from "~/components/user-task-select";

export const userTaskColumn: BpmnFormColumnItem[] = [
  {
    label: "优先级",
    prop: "priority"
  },
  {
    label: "驳回节点",
    prop: "rollbackNode",
    type: "select",
    component: UserTaskSelect
  },
  {
    label: "重新提交后回到驳回人",
    prop: "backToRejecter",
    type: "switch",
    dicData: [
      { label: "否", value: "false" },
      { label: "是", value: "true" }
    ]
  }
];
