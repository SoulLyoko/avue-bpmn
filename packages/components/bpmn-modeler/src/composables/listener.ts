import type { ModelerState } from "~/types";
import type { ModelerEmitFn } from "..";

import { nextTick } from "vue-demi";
import { debounce } from "lodash-unified";

export function useModelerListener({ state, emit }: { state: ModelerState; emit: ModelerEmitFn }) {
  const { modeler, elementRegistry, element } = state;
  const selectionChanged = debounce(async (e: any) => {
    element.value = undefined;
    const ele = e.newSelection[0];
    const processElement = elementRegistry.value?.find(item => item.type === "bpmn:Process");
    await nextTick();
    element.value = ele || processElement;
    emit("update:element", element.value!);
  }, 100);
  const commandStackChanged = debounce(async () => {
    const res = await modeler.value?.saveXML?.({ format: true });
    res?.xml && emit("update:xml", res?.xml);
  }, 100);
  modeler.value?.on("selection.changed", selectionChanged);
  modeler.value?.on("commandStack.changed", commandStackChanged);
}
