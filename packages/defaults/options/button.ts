import type { BpmnFormColumnItem } from "~/types";

import { pick } from "lodash-unified";

import { filterObj, updateExtensionElements } from "~/utils";
import { BpmnText } from "~/components/bpmn-text";

export const flowButtonDisplayDict = [
  { label: "显示", value: "true" },
  { label: "隐藏", value: "false" },
  { label: "发起人", value: "startUser" },
  { label: "处理人", value: "assignee" },
  { label: "未发起", value: "unstarted" },
  { label: "已发起", value: "started" },
  { label: "未办结", value: "unfinished" },
  { label: "已办结", value: "finished" }
];

export const flowButtonApprovalDict = [
  { label: "不显示", value: "false" },
  { label: "审批人", value: "approver" },
  { label: "抄送人", value: "copyUser" },
  { label: "意见", value: "comment" }
];

export interface ButtonItem {
  label?: string;
  prop?: string;
  display?: string;
  approval?: string;
}

export const buttonColumn: BpmnFormColumnItem = {
  label: "",
  labelWidth: 0,
  prop: "button",
  type: "dynamic",
  children: {
    addBtn: false,
    delBtn: false,
    column: [
      { prop: "_index", hide: true },
      { label: "字段名", prop: "label", width: 100, component: BpmnText },
      { label: "字段值", prop: "prop", width: 100, component: BpmnText },
      {
        label: "显示条件",
        prop: "display",
        type: "select",
        multiple: true,
        dataType: "string",
        clearable: true,
        dicData: flowButtonDisplayDict
      },
      {
        label: "审批窗口",
        prop: "approval",
        type: "select",
        multiple: true,
        dataType: "string",
        clearable: true,
        dicData: flowButtonApprovalDict
      }
    ]
  },
  value: [],
  updateFormData({ formData, businessObject, prefix }) {
    const values = businessObject?.extensionElements?.values ?? [];
    formData.value.button = this.value?.map((item: ButtonItem) => {
      const findButtonElement = values.find(e => e.$type === prefix("Button") && e.$attrs.prop === item.prop);
      const attrs = findButtonElement?.$attrs ?? {};
      return { ...item, ...pick(attrs, "display", "approval") };
    });
  },
  updateProperties(state) {
    const { formData, moddle, prefix } = state;
    const { button } = formData.value;
    const buttonElements = button?.map(item => {
      return moddle.value!.create(prefix("Button"), filterObj(item, [], ["$", "_"]));
    });
    updateExtensionElements(state, "Button", buttonElements);
  }
};
