import type { BpmnFormColumnItem } from "~/types";

import { filterObj, updateExtensionElements } from "~/utils";

export interface TimelimitItem {
  name?: string;
  min?: string;
  max?: string;
}

export const timelimitColumn: BpmnFormColumnItem = {
  label: "",
  labelWidth: 0,
  prop: "timelimit",
  type: "dynamic",
  children: {
    column: [
      { label: "名称", prop: "name" },
      { label: "最小值", prop: "min", type: "number" },
      { label: "最大值", prop: "max", type: "number" }
    ]
  },
  value: [],
  updateFormData({ formData, businessObject, prefix }) {
    const values = businessObject?.extensionElements?.values ?? [];
    const timelimitElements = values.filter(e => e.$type === prefix("Timelimit"));
    if (timelimitElements.length) {
      formData.value.timelimit = timelimitElements.map(e => filterObj(e.$attrs, [], ["$", "_"]));
    } else {
      formData.value.timelimit = this.value ?? [];
    }
  },
  updateProperties(state) {
    const { formData, moddle, prefix } = state;
    const { timelimit } = formData.value;
    const timelimitElements = timelimit?.map(item => {
      return moddle.value!.create(prefix("Timelimit"), filterObj(item, [], ["$", "_"]));
    });
    updateExtensionElements(state, "Timelimit", timelimitElements);
  }
};
