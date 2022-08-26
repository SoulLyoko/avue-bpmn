import type { BpmnState } from "~/types";
import type { WatchStopHandle } from "vue-demi";

import { watch, nextTick } from "vue-demi";

import { defaultGroup } from "~/defaults";
import { buildColumn } from "~/utils";

export type UpdateWatchers = Map<string, WatchStopHandle>;

const watchers: UpdateWatchers = new Map();
export function useUpdateColumn(state: BpmnState) {
  const { element, formOption, props } = state;
  watch(
    () => [element, props.formOptions],
    async () => {
      watchers.forEach(stop => stop?.());

      if (!element.value) return;
      formOption.group = [...(props.formOptions![element.value!.type] || defaultGroup)];
      formOption.column = [...buildColumn(formOption.group)];
      await nextTick();
      updateFormData(state);
      await nextTick();
      updateProperties(state);
    },
    { deep: true }
  );
}

export function updateFormData(state: BpmnState) {
  const { element, formOption, formData, prefix } = state;
  const { businessObject } = element.value ?? {};
  const { $attrs } = businessObject ?? {};
  formOption.column?.forEach(col => {
    if (col.updateFormData) {
      col.updateFormData?.({ ...state, businessObject: businessObject!, $attrs });
    } else {
      formData.value[col.prop!] = $attrs[prefix(col.prop!)] || col.value || "";
    }
  });
}

export function updateProperties(state: BpmnState) {
  const { element, formOption, formData, modeling, prefix } = state;
  const { column } = formOption;
  column.forEach(col => {
    const stop = watch(
      () => formData.value[col.prop!],
      val => {
        const { businessObject } = element.value ?? {};
        const { $attrs } = businessObject ?? {};
        if (col.updateProperties) {
          col.updateProperties?.({ ...state, businessObject: businessObject!, $attrs });
        } else {
          modeling.value?.updateProperties(element.value!, {
            [prefix(col.prop!)]: val || undefined
          });
        }
      },
      { deep: true, immediate: true }
    );
    watchers.set(col.prop!, stop);
  });
}
