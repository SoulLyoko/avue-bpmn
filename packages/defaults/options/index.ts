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
export * from "./userTask";

import type { BpmnFormOptions } from "~/types";

import {
  assigneeListColumn,
  baseColumns,
  buttonListColumn,
  executionListenerListColumn,
  formpropertyListColumn,
  multiInstanceColumns,
  processColumns,
  propertyListColumn,
  sequenceFlowColumns,
  serialListColumn,
  serviceTaskColumns,
  taskListenerListColumn,
  timelimitListColumn,
  userTaskColumns
} from ".";

export const defaultGroup = [{ label: "基本配置", prop: "base", column: baseColumns }];

export const defaultOptions: BpmnFormOptions = {
  "bpmn:StartEvent": [
    { label: "基本配置", prop: "base", column: baseColumns },
    { label: "表单配置", prop: "formproperty", collapse: false, column: [formpropertyListColumn] },
    { label: "扩展属性", prop: "property", collapse: false, column: [propertyListColumn] }
  ],
  "bpmn:EndEvent": [
    { label: "基本配置", prop: "base", column: baseColumns },
    { label: "表单配置", prop: "formproperty", collapse: false, column: [formpropertyListColumn] },
    { label: "扩展属性", prop: "property", collapse: false, column: [propertyListColumn] }
  ],
  "bpmn:Process": [
    { label: "流程配置", prop: "base", column: processColumns },
    { label: "流水号配置", prop: "serial", collapse: false, column: [serialListColumn] },
    { label: "扩展属性", prop: "property", collapse: false, column: [propertyListColumn] }
  ],
  "bpmn:UserTask": [
    { label: "基本配置", prop: "base", column: [...baseColumns, ...userTaskColumns] },
    { label: "人员配置", prop: "assignee", collapse: false, column: [assigneeListColumn] },
    { label: "多实例配置", prop: "multiInstance", collapse: false, column: multiInstanceColumns },
    { label: "按钮配置", prop: "button", collapse: false, column: [buttonListColumn] },
    { label: "表单配置", prop: "formproperty", collapse: false, column: [formpropertyListColumn] },
    { label: "任务监听", prop: "taskListener", collapse: false, column: [taskListenerListColumn] },
    { label: "执行监听", prop: "executionListener", collapse: false, column: [executionListenerListColumn] },
    { label: "时限控制", prop: "timelimit", collapse: false, column: [timelimitListColumn] },
    { label: "扩展属性", prop: "property", collapse: false, column: [propertyListColumn] }
  ],
  "bpmn:ServiceTask": [
    { label: "基本配置", prop: "base", column: baseColumns },
    { label: "服务配置", prop: "service", collapse: false, column: serviceTaskColumns }
  ],
  "bpmn:SequenceFlow": [
    { label: "基本配置", prop: "base", column: baseColumns },
    { label: "条件配置", prop: "sequenceFlow", collapse: false, column: sequenceFlowColumns },
    { label: "扩展属性", prop: "property", collapse: false, column: [propertyListColumn] }
  ],
  "bpmn:SubProcess": [
    { label: "基本配置", prop: "base", column: baseColumns },
    { label: "人员配置", prop: "assignee", collapse: false, column: [assigneeListColumn] },
    { label: "多实例配置", prop: "multiInstance", collapse: false, column: multiInstanceColumns },
    { label: "扩展属性", prop: "property", collapse: false, column: [propertyListColumn] }
  ]
};
