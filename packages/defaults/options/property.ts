import type { BpmnFormColumnItem } from "~/types";

import { filterObj, updateExtensionElements } from "~/utils";

export interface PropertyItem {
  name?: string;
  value?: string;
}

export const propertyColumn: BpmnFormColumnItem[] = [
  {
    label: "",
    labelWidth: 0,
    prop: "propertyList",
    type: "dynamic",
    children: {
      column: [
        { label: "属性名", prop: "name" },
        { label: "属性值", prop: "value", type: "textarea", minRows: 1 }
      ]
    },
    updateFormData({ formData, businessObject, prefix }) {
      const values = businessObject?.extensionElements?.values ?? [];
      const propertyElements = values.filter(e => e.$type === prefix("Property"));
      formData.value.propertyList = propertyElements.map(e => filterObj(e.$attrs, [], ["$", "_"]));
    },
    updateProperties(state) {
      const { formData, moddle, prefix } = state;
      const { propertyList } = formData.value;
      const propertyElements = propertyList?.map((item: any) => {
        return moddle.value!.create(prefix("Property"), filterObj(item, [], ["$", "_"]));
      });
      updateExtensionElements(state, "Property", propertyElements);
    }
  }
];
