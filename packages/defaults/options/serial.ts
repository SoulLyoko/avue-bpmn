import type { BpmnFormColumnItem } from "~/types";

import { filterObj, updateExtensionElements } from "~/utils";

export interface SerialItem {
  name?: string;
  prefix?: string;
  dateFormat?: string;
  suffixLength?: string;
  startSequence?: string;
  connector?: string;
  cycle?: string;
}

export const serialColumn: BpmnFormColumnItem[] = [
  {
    label: "",
    labelWidth: 0,
    prop: "serialList",
    type: "dynamic",
    children: {
      addBtn: false,
      delBtn: false,
      index: false,
      type: "form",
      column: [
        { label: "名称", prop: "name" },
        { label: "前缀", prop: "prefix" },
        { label: "日期格式", prop: "dateFormat" },
        { label: "后缀位数", prop: "suffixLength" },
        { label: "初始数值", prop: "startSequence" },
        { label: "连接符", prop: "connector" },
        {
          label: "重置周期",
          prop: "cycle",
          type: "select",
          dicData: [
            { label: "不重置", value: "none" },
            { label: "按天重置", value: "day" },
            { label: "按周重置", value: "week" },
            { label: "按月重置", value: "month" },
            { label: "按年重置", value: "year" }
          ]
        }
      ]
    },
    value: [{ name: "", prefix: "", dateFormat: "", suffixLength: "", startSequence: "", connector: "", cycle: "" }],
    updateFormData({ formData, businessObject, prefix }) {
      const values = businessObject?.extensionElements?.values ?? [];
      const serialElements = values.filter(e => e.$type === prefix("Serial"));
      if (serialElements.length) {
        formData.value.serialList = serialElements.map(e => filterObj(e.$attrs, [], ["$", "_"]));
      } else {
        formData.value.serialList = this.value ?? [];
      }
    },
    updateProperties(state) {
      const { formData, moddle, prefix } = state;
      const { serialList } = formData.value;
      const serialListElements = serialList?.map(item => {
        return moddle.value!.create(prefix("Serial"), filterObj(item, [], ["$", "_"]));
      });
      updateExtensionElements(state, "Serial", serialListElements);
    }
  }
];
