import type { BpmnFormColumnItem } from "~/types";

import { idColumn, nameColumn, documentationColumn } from "./base";
import { BpmnSelect } from "~/components/bpmn-select";

export const processIdColumn: BpmnFormColumnItem = { ...idColumn, label: "流程标识" };
export const processNameColumn: BpmnFormColumnItem = { ...nameColumn, label: "流程名称" };
export const processDocumentationColumn: BpmnFormColumnItem = { ...documentationColumn, label: "流程描述" };
export const processCategoryColumn: BpmnFormColumnItem = {
  label: "流程分类",
  prop: "category",
  updateFormData({ formData, $attrs }) {
    const { category } = $attrs;
    formData.value.category = category || "";
  },
  updateProperties({ formData, element, modeling }) {
    const { category } = formData.value;
    modeling.value?.updateProperties(element.value!, { category: category || undefined });
  }
};
export const processIconColumn: BpmnFormColumnItem = { label: "图标", prop: "icon" };
export const processSkipFirstNodeColumn: BpmnFormColumnItem = {
  label: "跳过第一节点",
  prop: "skipFirstNode",
  type: "switch",
  labelWidth: 100,
  value: "true",
  dicData: [
    { label: "否", value: "false" },
    { label: "是", value: "true" }
  ]
};
export const processRollbackNodeColumn: BpmnFormColumnItem = {
  label: "默认驳回节点",
  prop: "rollbackNode",
  type: "select",
  labelWidth: 100,
  component: BpmnSelect,
  params: { filterType: "bpmn:UserTask" }
};

export const processColumns = [
  processIdColumn,
  processNameColumn,
  processDocumentationColumn,
  processCategoryColumn,
  processIconColumn,
  processSkipFirstNodeColumn,
  processRollbackNodeColumn
];
