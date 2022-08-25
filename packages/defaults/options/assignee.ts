import type { BpmnFormColumnItem } from "~/types";

import { filterObj, updateExtensionElements } from "~/utils";

export interface AssigneeItem {
  type?: string;
  value?: string;
}

export const assigneeColumn: BpmnFormColumnItem[] = [
  {
    label: "",
    labelWidth: 0,
    prop: "assigneeList",
    type: "dynamic",
    children: {
      rowKey: "type",
      addBtn: true,
      column: [
        { label: "类型", prop: "type" },
        { label: "值", prop: "value" }
      ]
    },
    updateFormData({ formData, businessObject, prefix }) {
      const values = businessObject?.extensionElements?.values ?? [];
      const assigneeElements = values.filter(e => e.$type === prefix("Assignee"));
      formData.value.assigneeList = assigneeElements.map(e => filterObj(e.$attrs, [], ["$", "_"]));
    },
    updateProperties(state) {
      const { formData, moddle, prefix } = state;
      const { assigneeList } = formData.value;
      const assigneeListElements = assigneeList?.map(item => {
        return moddle.value!.create(prefix("Assignee"), filterObj(item, [], ["$", "_"]));
      });
      updateExtensionElements(state, "Assignee", assigneeListElements);
    }
  }
];
