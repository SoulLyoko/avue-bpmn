import type { BpmnFormColumnItem } from "~/types";

import { BpmnSelect } from "~/components/bpmn-select";

export const priorityColumn: BpmnFormColumnItem = {
  label: "优先级",
  prop: "priority"
};

export const rollbackNodeColumn: BpmnFormColumnItem = {
  label: "驳回节点",
  prop: "rollbackNode",
  type: "select",
  component: BpmnSelect,
  params: { filterType: "bpmn:UserTask" }
};

export const backToRejecterColumn: BpmnFormColumnItem = {
  label: "重新提交后回到驳回人",
  prop: "backToRejecter",
  type: "switch",
  dicData: [
    { label: "否", value: "false" },
    { label: "是", value: "true" }
  ]
};

export const userTaskColumns = [priorityColumn, rollbackNodeColumn, backToRejecterColumn];
