import type { BpmnBaseElement } from "bpmn-js";
import type { ModdleElement } from "diagram-js/lib/model";
import type { BpmnFormGroupItem, BpmnState } from "~/types";

import { reactive, ref, computed, watchEffect, set } from "vue-demi";
import { upperFirst, lowerFirst, update as _update, set as _set } from "lodash-unified";

import * as options from "~/defaults/options";

export function updateExtensionElements(state: BpmnState, type: string, elements: ModdleElement[] = []) {
  const { element, moddle, modeling, prefix } = state;
  const { businessObject } = element.value!;
  const otherExtensionElements = businessObject?.extensionElements?.values?.filter(e => e.$type !== prefix(type)) ?? [];
  const values = [...otherExtensionElements, ...elements];
  const extensionElements = moddle.value?.create("bpmn:ExtensionElements", { values });
  modeling.value?.updateProperties(element.value!, {
    extensionElements: values.length ? extensionElements : undefined
  });
}

export function updateListenerFormData(state: BpmnState, type: string) {
  const { element, formData, prefix } = state;
  const { businessObject } = element.value!;
  const values = (businessObject as BpmnBaseElement)?.extensionElements?.values ?? [];
  const listenerElements = values.filter(e => e.$type === prefix(upperFirst(type)));
  formData.value[lowerFirst(type + "List")] = listenerElements.map(listenerItem => {
    const {
      $attrs: { event },
      fields
    } = listenerItem;
    const eventType = ["class", "expression", "delegateExpression"].find(type => type in listenerItem.$attrs);
    const eventValue = listenerItem.$attrs[eventType || ""];
    const fieldList =
      fields?.map((fieldItem: any) => {
        const {
          $attrs: { name }
        } = fieldItem;
        const fieldType = ["string", "expression"].find(type => type in fieldItem);
        const fieldValue = fieldItem[fieldType || ""];
        return { fieldName: name, fieldType, fieldValue };
      }) ?? [];
    return { eventName: event, eventType, eventValue, fieldList };
  });
}

export function updateListenerProperties(state: BpmnState, type: string) {
  const { moddle, formData, prefix } = state;
  const listenerList: any[] = formData.value[lowerFirst(type + "List")] || [];
  const listenerElements = listenerList.map(listenerItem => {
    const { eventName, eventType, eventValue, fieldList } = listenerItem;
    const fieldListElements =
      fieldList?.map((fieldItem: any) => {
        const { fieldName, fieldType, fieldValue } = fieldItem;
        const newFieldItem = { name: fieldName, [fieldType]: fieldValue };
        return moddle.value?.create(prefix("Field"), { ...newFieldItem });
      }) ?? [];
    return moddle.value!.create(prefix(upperFirst(type)), {
      event: eventName,
      [eventType]: eventValue,
      fields: fieldListElements
    });
  });
  updateExtensionElements(state, upperFirst(type), listenerElements);
}

export function buildColumn(groups: BpmnFormGroupItem[]) {
  return groups
    .map(e => e.column)
    .flat()
    .map(e => ({ ...e, display: false }));
}

export type OptionsKey = keyof typeof options;
export function useOptions() {
  const reactiveOptions = reactive(options);
  const defaultOptions = ref(reactiveOptions.defaultOptions);
  const update = (
    updateObj: Record<
      `${OptionsKey}.${string}`,
      ((value: any) => any) | string | boolean | number | Array<any> | Object
    >
  ) => {
    Object.entries(updateObj).forEach(([key, value]) => {
      const [optionsKey, ...path] = key.split(".");
      if (value instanceof Function) {
        return _update(reactiveOptions[optionsKey as OptionsKey], path, value);
      } else {
        return _set(reactiveOptions[optionsKey as OptionsKey], path, value);
      }
    });
    defaultOptions.value = reactiveOptions.defaultOptions;
  };
  // const defaultOptions = computed(() => reactiveOptions.defaultOptions);
  watchEffect(() => {
    console.log("🚀 ~ file: bpmn.ts ~ line 92 ~ useOptions ~ defaultOptions", defaultOptions);
  });
  return { options: defaultOptions, update };
}
