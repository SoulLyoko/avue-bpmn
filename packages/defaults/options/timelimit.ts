import type { BpmnFormColumnItem } from "~/types";

import { filterObj, updateExtensionElements } from "~/utils";

export const timelimitColumn: BpmnFormColumnItem[] = [
  {
    label: "",
    labelWidth: 0,
    prop: "timelimitList",
    type: "dynamic",
    children: {
      span: 8,
      labelWidth: 50,
      column: [
        { label: "名称", prop: "name" },
        { label: "最小值", prop: "min", type: "number" },
        { label: "最大值", prop: "max", type: "number" }
      ]
    },
    updateFormData({ formData, businessObject, prefix }) {
      const values = businessObject?.extensionElements?.values ?? [];
      const timelimitElements = values.filter(e => e.$type === prefix("Timelimit"));
      formData.value.timelimitList = timelimitElements.map(e => filterObj(e.$attrs, [], ["$", "_"]));
    },
    updateProperties(state) {
      const { formData, moddle, prefix } = state;
      const { timelimitList } = formData.value;
      const timelimitListElements = timelimitList?.map(item => {
        return moddle.value!.create(prefix("Timelimit"), filterObj(item, [], ["$", "_"]));
      });
      updateExtensionElements(state, "Timelimit", timelimitListElements);
    }
  }
];
