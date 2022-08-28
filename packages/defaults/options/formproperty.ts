import type { BpmnFormColumnItem } from "~/types";

import { omit } from "lodash-unified";

import { filterObj, updateExtensionElements } from "~/utils";
import { BpmnText } from "~/components/bpmn-text";
import { BpmnCheckbox } from "~/components/bpmn-checkbox";

export interface FormpropertyListItem {
  label?: string;
  prop?: string;
  display?: string;
  disabled?: string;
  detail?: string;
  required?: string;
}

export const formpropertyListColumn: BpmnFormColumnItem = {
  label: "",
  labelWidth: 0,
  prop: "formpropertyList",
  type: "dynamic",
  children: {
    addBtn: false,
    delBtn: false,
    column: [
      { prop: "_index", hide: true },
      { label: "字段", prop: "label", component: BpmnText },
      { label: "属性", prop: "prop", component: BpmnText },
      { label: "显示", prop: "display", width: 40, component: BpmnCheckbox },
      { label: "禁用", prop: "disabled", width: 40, component: BpmnCheckbox },
      { label: "详情", prop: "detail", width: 40, component: BpmnCheckbox },
      { label: "必填", prop: "required", width: 40, component: BpmnCheckbox }
    ]
  },
  value: [],
  updateFormData({ formData, businessObject, prefix }) {
    const values = businessObject?.extensionElements?.values ?? [];
    formData.value.formpropertyList = this.value?.map((item: FormpropertyListItem) => {
      const findFormPropertyElement = values.find(
        e => e.$type === prefix("Formproperty") && e.$attrs.prop === item.prop
      );
      const attrs = findFormPropertyElement?.$attrs ?? {};
      const result = { ...item, ...omit(attrs, ["label", "prop"]) };
      return result;
    });
  },
  updateProperties(state) {
    const { formData, moddle, prefix } = state;
    const { formpropertyList } = formData.value;
    const formpropertyListElements = formpropertyList?.map(item => {
      return moddle.value!.create(prefix("Formproperty"), filterObj(item, [], ["$", "_"]));
    });
    updateExtensionElements(state, "Formproperty", formpropertyListElements);
  }
};
