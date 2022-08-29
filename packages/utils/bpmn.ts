import type { BpmnBaseElement } from "bpmn-js";
import type { ModdleElement } from "diagram-js/lib/model";
import type { BpmnState } from "~/types";
import type { ListenerItem } from "~/defaults/options";

import { upperFirst, lowerFirst } from "lodash-unified";

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

export function updateListenerFormData(state: BpmnState, type: `${string}Listener`) {
  const { element, formData, prefix } = state;
  const { businessObject } = element.value!;
  const values = (businessObject as BpmnBaseElement)?.extensionElements?.values ?? [];
  const listenerElements = values.filter(e => e.$type === prefix(upperFirst(type)));
  formData.value[lowerFirst(type)] = listenerElements.map(listenerItem => {
    const {
      $attrs: { event },
      fields: fieldsElements
    } = listenerItem;
    const eventType = ["class", "expression", "delegateExpression"].find(type => type in listenerItem.$attrs);
    const eventValue = listenerItem.$attrs[eventType || ""];
    const fields =
      fieldsElements?.map((fieldItem: ModdleElement) => {
        const {
          $attrs: { name }
        } = fieldItem;
        const fieldType = ["string", "expression"].find(type => type in fieldItem);
        const fieldValue = fieldItem[fieldType || ""];
        return { fieldName: name, fieldType, fieldValue };
      }) ?? [];
    return { eventName: event, eventType, eventValue, fields };
  });
}

export function updateListenerProperties(state: BpmnState, type: `${string}Listener`) {
  const { moddle, formData, prefix } = state;
  const listenerList: ListenerItem[] = formData.value[lowerFirst(type)] || [];
  const listenerElements = listenerList.map(listenerItem => {
    const { eventName, eventType, eventValue, fields } = listenerItem;
    const fieldsElements =
      fields?.map(fieldItem => {
        const { fieldName, fieldType, fieldValue } = fieldItem;
        const newFieldItem = { name: fieldName, [fieldType!]: fieldValue };
        return moddle.value?.create(prefix("Field"), { ...newFieldItem });
      }) ?? [];
    return moddle.value!.create(prefix(upperFirst(type)), {
      event: eventName,
      [eventType!]: eventValue,
      fields: fieldsElements
    });
  });
  updateExtensionElements(state, upperFirst(type), listenerElements);
}
