import type { BpmnFormColumnItem } from "~/types";

import { omit } from "lodash-unified";

import { filterObj, updateExtensionElements } from "~/utils";
import { AvueText } from "~/components/avue-text";

export interface FormpropertyItem {
  label?: string;
  prop?: string;
  display?: string;
  disabled?: string;
  detail?: string;
  required?: string;
}

export const formpropertyColumn: BpmnFormColumnItem[] = [
  {
    label: "",
    labelWidth: 0,
    prop: "formpropertyList",
    type: "dynamic",
    children: {
      addBtn: false,
      delBtn: false,
      column: [
        { prop: "_index", hide: true },
        { label: "字段", prop: "label", component: AvueText },
        { label: "属性", prop: "prop", component: AvueText },
        { label: "显示", prop: "display", width: 40, component: "el-checkbox" },
        { label: "禁用", prop: "disabled", width: 40, component: "el-checkbox" },
        { label: "详情", prop: "detail", width: 40, component: "el-checkbox" },
        { label: "必填", prop: "required", width: 40, component: "el-checkbox" }
      ]
    },
    updateFormData({ formData, businessObject, props, prefix }) {
      const values = businessObject?.extensionElements?.values ?? [];
      formData.value.formpropertyList = props.formpropertyList.map(item => {
        const findFormPropertyElement = values.find(
          e => e.$type === prefix("Formproperty") && e.$attrs.prop === item.prop
        );
        const attrs = findFormPropertyElement?.$attrs ?? {};
        const result = { ...item, ...omit(attrs, ["label", "prop"]) };
        Object.entries(result).forEach(([key, value]) => {
          if (value === "true") {
            result[key] = true;
          }
        });
        return result;
      });
    },
    updateProperties(state) {
      const { formData, moddle, prefix } = state;
      const { formpropertyList } = formData.value;
      const formpropertyListElements = formpropertyList?.map((item: any) => {
        return moddle.value!.create(prefix("Formproperty"), filterObj(item, [], ["$", "_"]));
      });
      updateExtensionElements(state, "Formproperty", formpropertyListElements);
    }
  }
];
