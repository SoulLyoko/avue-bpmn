import type { BpmnState } from "~/types";
import type { ModelerEmitFn } from "..";

import { nextTick } from "vue-demi";

export function useModelerListener({ state, emit }: { state: BpmnState; emit: ModelerEmitFn }) {
  const { modeler, elementRegistry, element } = state;
  modeler.value?.on("selection.changed", async e => {
    element.value = undefined;
    const ele = e.newSelection[0];
    const processElement = elementRegistry.value?.find(item => item.type === "bpmn:Process");
    await nextTick();
    element.value = ele || processElement;
    emit("update:element", element.value!);
  });
  modeler.value?.on("commandStack.changed", async () => {
    const res = await modeler.value?.saveXML?.({ format: true });
    res?.xml && emit("update:xml", res?.xml);
  });
}
