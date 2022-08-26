import { baseColumn } from "./base";
import { BpmnSelect } from "~/components/bpmn-select";

export const processColumn = [
  ...baseColumn.map(col => {
    return {
      ...col,
      label: col.label?.replace("节点", "流程")
    };
  }),
  { label: "流程分类", prop: "category" },
  { label: "图标", prop: "icon" },
  {
    label: "跳过第一节点",
    prop: "skipFirstNode",
    type: "switch",
    labelWidth: 100,
    value: "true",
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
    component: BpmnSelect,
    params: { filterType: "bpmn:UserTask" }
  }
];
