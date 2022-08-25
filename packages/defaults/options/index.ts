export * from "./assignee";
export * from "./base";
export * from "./button";
export * from "./executionListener";
export * from "./formproperty";
export * from "./multiInstance";
export * from "./process";
export * from "./property";
export * from "./sequenceFlow";
export * from "./serial";
export * from "./serviceTask";
export * from "./taskListener";
export * from "./timelimit";

import type { BpmnFormOptions, BpmnFormGroupItem } from "~/types";
import type { AssigneeItem, FormpropertyItem, PropertyItem, SerialItem, ButtonItem } from ".";

import {
  assigneeColumn,
  baseColumn,
  buttonColumn,
  executionListenerColumn,
  formpropertyColumn,
  multiInstanceColumn,
  processColumn,
  propertyColumn,
  sequenceFlowColumn,
  serialColumn,
  serviceTaskColumn,
  taskListenerColumn,
  timelimitColumn
} from ".";

export function buildColumn(groups: BpmnFormGroupItem[]) {
  return groups
    .map(e => e.column)
    .flat()
    .map(e => ({ ...e, display: false }));
}

export const defaultGroup = [{ label: "基本配置", column: baseColumn }];

export const defaultOptions: BpmnFormOptions = {
  "bpmn:StartEvent": [
    { label: "基本配置", prop: "base", column: baseColumn },
    { label: "表单配置", prop: "formproperty", collapse: false, column: formpropertyColumn },
    { label: "扩展属性", prop: "property", collapse: false, column: propertyColumn }
  ],
  "bpmn:EndEvent": [
    { label: "基本配置", prop: "base", column: baseColumn },
    { label: "表单配置", prop: "formproperty", collapse: false, column: formpropertyColumn },
    { label: "扩展属性", prop: "property", collapse: false, column: propertyColumn }
  ],
  "bpmn:Process": [
    { label: "流程配置", prop: "base", column: [...processColumn] },
    { label: "流水号配置", prop: "serial", collapse: false, column: serialColumn },
    { label: "扩展属性", prop: "property", collapse: false, column: propertyColumn }
  ],
  "bpmn:UserTask": [
    { label: "基本配置", prop: "base", column: baseColumn },
    { label: "人员配置", prop: "assignee", collapse: false, column: assigneeColumn },
    { label: "多实例配置", prop: "multiInstace", collapse: false, column: [...multiInstanceColumn] },
    { label: "按钮配置", prop: "button", collapse: false, column: [...buttonColumn] },
    { label: "表单配置", prop: "formproperty", collapse: false, column: formpropertyColumn },
    { label: "任务监听", prop: "taskListener", collapse: false, column: [...taskListenerColumn] },
    { label: "执行监听", prop: "executionListener", collapse: false, column: [...executionListenerColumn] },
    { label: "时限控制", prop: "timelimit", collapse: false, column: [...timelimitColumn] },
    { label: "扩展属性", prop: "property", collapse: false, column: propertyColumn }
  ],
  "bpmn:ServiceTask": [
    { label: "基本配置", prop: "base", column: baseColumn },
    { label: "服务配置", prop: "service", collapse: false, column: serviceTaskColumn }
  ],
  "bpmn:SequenceFlow": [
    { label: "基本配置", prop: "base", column: baseColumn },
    { label: "条件配置", prop: "sequenceFlow", collapse: false, column: sequenceFlowColumn },
    { label: "扩展属性", prop: "property", collapse: false, column: propertyColumn }
  ]
};

export const defaultFormData = {
  id: "",
  name: "",
  categoryId: "",
  modelKey: "",
  icon: "",
  documentation: "",
  description: "",
  formKey: "",
  priority: "",
  rollbackNode: "",
  backToRejecter: "",
  assignee: "",
  sequenceFlowType: "",
  conditionExpression: "",
  skipExpression: "",
  multiInstanceType: "",
  completionCondition: "",
  collection: "",
  elementVariable: "",
  class: "",
  async: "",
  serialList: [] as SerialItem[],
  buttonList: [] as ButtonItem[],
  assigneeList: [] as AssigneeItem[],
  taskListenerList: [] as any[],
  executionListenerList: [] as any[],
  propertyList: [] as PropertyItem[],
  timelimitList: [] as any[],
  formpropertyList: [] as FormpropertyItem[]
};
