import type { BpmnState } from "~/types";
import type { WatchStopHandle } from "vue-demi";

import { watch, nextTick } from "vue-demi";

import { defaultGroup, buildColumn } from "~/defaults";

type UpdateWatchers = Map<string, WatchStopHandle>;

export function useUpdateColumn(state: BpmnState) {
  const { element, formOption, options } = state;
  const watchers: UpdateWatchers = new Map();
  watch(
    element,
    async ele => {
      if (!ele) return;
      formOption.group = [...(options.value[ele.type] || defaultGroup)];
      formOption.column = [...buildColumn(formOption.group)];
      await nextTick();
      watchers.forEach(stop => stop?.());
      updateFormData(state);
      await nextTick();
      updateProperties(state, watchers);
    },
    { immediate: true }
  );
}

export function updateFormData(state: BpmnState) {
  const { element, formOption, formData, prefix } = state;
  const { businessObject } = element.value ?? {};
  const { $attrs } = businessObject ?? {};
  formOption.column?.forEach((col: any) => {
    if (col.updateFormData) {
      col.updateFormData?.({ ...state, businessObject, $attrs });
    } else {
      formData.value[col.prop] = $attrs[prefix(col.prop!)] || col.value || "";
    }
  });
}

export function updateProperties(state: BpmnState, watchers: UpdateWatchers) {
  const { element, formOption, formData, modeling, prefix } = state;
  const { column } = formOption;
  column.forEach(col => {
    const stop = watch(
      () => formData.value[col.prop as any],
      val => {
        console.log("updateProperties");
        const { businessObject } = element.value ?? {};
        const { $attrs } = businessObject ?? {};
        if (col.updateProperties) {
          col.updateProperties?.({ ...state, businessObject, $attrs });
        } else {
          modeling.value?.updateProperties(element.value!, {
            [prefix(col.prop!)]: val || undefined
          });
        }
      },
      { deep: true }
    );
    watchers.set(col.prop!, stop);
  });
}
