import type { BpmnFormColumnItem } from "~/types";

import { filterObj, updateExtensionElements } from "~/utils";

export interface AssigneeItem {
  type?: string;
  value?: string;
}

export const assigneeColumn: BpmnFormColumnItem = {
  label: "",
  labelWidth: 0,
  prop: "assignee",
  type: "dynamic",
  children: {
    rowKey: "type",
    addBtn: true,
    column: [
      {
        label: "类型",
        prop: "type",
        type: "select",
        width: 120,
        dicData: [
          { label: "用户", value: "user" },
          { label: "部门", value: "dept" },
          { label: "角色", value: "role" },
          { label: "岗位", value: "post" },
          { label: "指定节点", value: "userTask" },
          { label: "自定义", value: "custom" }
        ]
      },
      { label: "值", prop: "value" }
    ]
  },
  value: [],
  updateFormData({ formData, businessObject, prefix }) {
    const values = businessObject?.extensionElements?.values ?? [];
    const assigneeElements = values.filter(e => e.$type === prefix("Assignee"));
    if (assigneeElements.length) {
      formData.value.assignee = assigneeElements.map(e => filterObj(e.$attrs, [], ["$", "_"]));
    } else {
      formData.value.assignee = this.value ?? [];
    }
  },
  updateProperties(state) {
    const { formData, moddle, prefix } = state;
    const { assignee } = formData.value;
    const assigneeElements = assignee?.map(item => {
      return moddle.value!.create(prefix("Assignee"), filterObj(item, [], ["$", "_"]));
    });
    updateExtensionElements(state, "Assignee", assigneeElements);
  }
};
