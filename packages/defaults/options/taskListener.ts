import type { BpmnFormColumnItem } from "~/types";

import { updateListenerFormData, updateListenerProperties } from "~/utils";

export interface TaskListenerListItem {
  eventName?: string;
  eventType?: string;
  eventValue?: string;
  fieldList?: {
    fieldName?: string;
    fieldType?: string;
    fieldValue?: string;
  }[];
}

export const taskListenerListColumn: BpmnFormColumnItem = {
  label: "",
  labelWidth: 0,
  prop: "taskListenerList",
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
          { label: "创建", value: "create" },
          { label: "指派", value: "assignment" },
          { label: "完成", value: "complete" },
          { label: "删除", value: "delete" },
          { label: "更新", value: "update" },
          { label: "超时", value: "timeout" }
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
    updateListenerFormData(state, "TaskListener");
  },
  updateProperties(state) {
    updateListenerProperties(state, "TaskListener");
  }
};
