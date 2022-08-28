import type { BpmnFormColumnItem } from "~/types";

import { filterObj, updateExtensionElements } from "~/utils";

export interface TimelimitListItem {
  name?: string;
  min?: string;
  max?: string;
}

export const timelimitListColumn: BpmnFormColumnItem = {
  label: "",
  labelWidth: 0,
  prop: "timelimitList",
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
      formData.value.timelimitList = timelimitElements.map(e => filterObj(e.$attrs, [], ["$", "_"]));
    } else {
      formData.value.timelimitList = this.value ?? [];
    }
  },
  updateProperties(state) {
    const { formData, moddle, prefix } = state;
    const { timelimitList } = formData.value;
    const timelimitListElements = timelimitList?.map(item => {
      return moddle.value!.create(prefix("Timelimit"), filterObj(item, [], ["$", "_"]));
    });
    updateExtensionElements(state, "Timelimit", timelimitListElements);
  }
};
