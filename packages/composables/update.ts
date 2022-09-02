import type { BpmnState, BpmnFormGroupItem } from "~/types";
import type { WatchStopHandle } from "vue-demi";

import { watch, nextTick } from "vue-demi";
import { debounce } from "lodash-unified";

import { defaultGroup } from "~/defaults";

export type UpdateWatchers = Map<string, WatchStopHandle>;

export function useUpdateColumn(state: BpmnState) {
  const watchers: UpdateWatchers = new Map();
  const { element, formOption, formRef, props } = state;
  const watchDebounce = debounce(async () => {
    watchers.forEach(stop => stop?.());
    if (!element.value) return;
    formOption.value.group = [...(props.formOptions![element.value!.type] || defaultGroup)];
    formOption.value.column = [...buildColumn(formOption.value.group)];
    formRef.value?.resetForm();
    await nextTick();
    updateProperties(state, watchers);
    await nextTick();
    updateFormData(state);
  });
  watch(() => [element, props.formOptions], watchDebounce, { deep: true });
}

export function buildColumn(groups: BpmnFormGroupItem[]) {
  return groups
    .map(e => e.column)
    .flat()
    .map(e => ({ ...e, display: false }));
}

export function updateFormData(state: BpmnState) {
  const { element, formOption, formData, prefix } = state;
  const { businessObject } = element.value ?? {};
  const { $attrs } = businessObject ?? {};
  formOption.value.column?.forEach(col => {
    if (col.updateFormData) {
      col.updateFormData?.({ ...state, businessObject: businessObject!, $attrs });
    } else {
      formData.value[col.prop!] = $attrs[prefix(col.prop!)] || col.value || "";
    }
  });
}

export function updateProperties(state: BpmnState, watchers: UpdateWatchers) {
  const { element, formOption, formData, modeling, prefix } = state;
  formOption.value.column.forEach(col => {
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
      { deep: true }
    );
    watchers.set(col.prop!, stop);
  });
}
