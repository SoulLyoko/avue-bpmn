export * from "./assignee";
export * from "./base";
export * from "./button";
export * from "./executionListener";
export * from "./formproperty";
export * from "./listener";
export * from "./multiInstance";
export * from "./process";
export * from "./property";
export * from "./sequenceFlow";
export * from "./serial";
export * from "./serviceTask";
export * from "./taskListener";
export * from "./timelimit";
export * from "./userTask";

import type { BpmnFormOptions } from "~/types";

import {
  assigneeColumn,
  baseColumns,
  buttonColumn,
  executionListenerColumn,
  formpropertyColumn,
  multiInstanceColumns,
  processColumns,
  propertyColumn,
  sequenceFlowColumns,
  serialColumn,
  serviceTaskColumns,
  taskListenerColumn,
  timelimitColumn,
  userTaskColumns
} from ".";

export const defaultGroup = [{ label: "基本配置", prop: "base", column: baseColumns }];

export const defaultOptions: BpmnFormOptions = {
  "bpmn:StartEvent": [
    { label: "基本配置", prop: "base", column: baseColumns },
    { label: "表单配置", prop: "formproperty", collapse: false, column: [formpropertyColumn] },
    { label: "扩展属性", prop: "property", collapse: false, column: [propertyColumn] }
  ],
  "bpmn:EndEvent": [
    { label: "基本配置", prop: "base", column: baseColumns },
    { label: "表单配置", prop: "formproperty", collapse: false, column: [formpropertyColumn] },
    { label: "扩展属性", prop: "property", collapse: false, column: [propertyColumn] },
    { label: "执行监听", prop: "executionListener", collapse: false, column: [executionListenerColumn] }
  ],
  "bpmn:Process": [
    { label: "流程配置", prop: "base", column: processColumns },
    { label: "流水号配置", prop: "serial", collapse: false, column: [serialColumn] },
    { label: "扩展属性", prop: "property", collapse: false, column: [propertyColumn] }
  ],
  "bpmn:UserTask": [
    { label: "基本配置", prop: "base", column: [...baseColumns, ...userTaskColumns] },
    { label: "人员配置", prop: "assignee", collapse: false, column: [assigneeColumn] },
    { label: "多实例配置", prop: "multiInstance", collapse: false, column: multiInstanceColumns },
    { label: "按钮配置", prop: "button", collapse: false, column: [buttonColumn] },
    { label: "表单配置", prop: "formproperty", collapse: false, column: [formpropertyColumn] },
    { label: "任务监听", prop: "taskListener", collapse: false, column: [taskListenerColumn] },
    { label: "执行监听", prop: "executionListener", collapse: false, column: [executionListenerColumn] },
    { label: "时限控制", prop: "timelimit", collapse: false, column: [timelimitColumn] },
    { label: "扩展属性", prop: "property", collapse: false, column: [propertyColumn] }
  ],
  "bpmn:ServiceTask": [
    { label: "基本配置", prop: "base", column: baseColumns },
    { label: "服务配置", prop: "service", collapse: false, column: serviceTaskColumns }
  ],
  "bpmn:SequenceFlow": [
    { label: "基本配置", prop: "base", column: baseColumns },
    { label: "条件配置", prop: "sequenceFlow", collapse: false, column: sequenceFlowColumns },
    { label: "扩展属性", prop: "property", collapse: false, column: [propertyColumn] }
  ],
  "bpmn:SubProcess": [
    { label: "基本配置", prop: "base", column: baseColumns },
    { label: "人员配置", prop: "assignee", collapse: false, column: [assigneeColumn] },
    { label: "多实例配置", prop: "multiInstance", collapse: false, column: multiInstanceColumns },
    { label: "扩展属性", prop: "property", collapse: false, column: [propertyColumn] }
  ]
};
