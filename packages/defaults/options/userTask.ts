import type { BpmnFormColumnItem } from "~/types";

import { cloneDeep } from "lodash-unified";

import { BpmnSelect } from "~/components/bpmn-select";
import { baseColumn } from "./base";

export const userTaskColumn: BpmnFormColumnItem[] = [
  ...cloneDeep(baseColumn),
  {
    label: "优先级",
    prop: "priority"
  },
  {
    label: "驳回节点",
    prop: "rollbackNode",
    type: "select",
    component: BpmnSelect,
    params: { filterType: "bpmn:UserTask" }
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
