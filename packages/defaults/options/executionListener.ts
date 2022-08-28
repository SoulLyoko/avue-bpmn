import type { BpmnFormColumnItem } from "~/types";

import { updateListenerFormData, updateListenerProperties } from "~/utils";

export interface ExecutionListenerListItem {
  eventName?: string;
  eventType?: string;
  eventValue?: string;
  fieldList?: {
    fieldName?: string;
    fieldType?: string;
    fieldValue?: string;
  }[];
}

export const executionListenerListColumn: BpmnFormColumnItem = {
  label: "",
  labelWidth: 0,
  prop: "executionListenerList",
  type: "dynamic",
  children: {
    type: "form",
    index: false,
    column: [
      {
        label: "事件",
        prop: "eventName",
        type: "select",
        dicData: [
          { label: "开始", value: "start" },
          { label: "任务", value: "task" },
          { label: "结束", value: "end" }
        ]
      },
      {
        label: "类型",
        prop: "eventType",
        type: "select",
        dicData: [
          { label: "类", value: "class" },
          { label: "表达式", value: "expression" },
          { label: "代理表达式", value: "delegateExpression" }
        ]
      },
      { label: "值", prop: "eventValue", type: "textarea", minRows: 1, span: 24 },
      {
        label: "字段",
        prop: "fieldList",
        type: "dynamic",
        span: 24,
        children: {
          column: [
            { label: "字段名", prop: "fieldName" },
            {
              label: "类型",
              prop: "fieldType",
              type: "select",
              dicData: [
                { label: "字符串", value: "string" },
                { label: "表达式", value: "expression" }
              ]
            },
            { label: "值", prop: "fieldValue" }
          ]
        }
      }
    ]
  },
  updateFormData(state) {
    updateListenerFormData(state, "ExecutionListener");
  },
  updateProperties(state) {
    updateListenerProperties(state, "ExecutionListener");
  }
};
