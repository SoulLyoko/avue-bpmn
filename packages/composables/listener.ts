import type { BpmnState } from "~/types";
import type { ModelerEmitFn } from "..";

import { debounce } from "lodash";
import { nextTick } from "vue-demi";

export function useModelerListener({ state, emit }: { state: BpmnState; emit: ModelerEmitFn }) {
  const { modeler, elementRegistry, element } = state;
  const onSelectionChanged = debounce(
    async e => {
      element.value = undefined;
      const ele = e.newSelection[0];
      const processElement = elementRegistry.value?.find((item: any) => item.type === "bpmn:Process");
      await nextTick();
      element.value = ele || processElement;
      emit("element-change", element.value);
    },
    100,
    { trailing: true }
  );
  const onCommandStackChanged = debounce(
    async () => {
      const res = await modeler.value?.saveXML?.({ format: true });
      res?.xml && emit("update:xml", res?.xml);
    },
    100,
    { trailing: true }
  );

  modeler.value?.on("selection.changed", onSelectionChanged);
  modeler.value?.on("commandStack.changed", onCommandStackChanged);
}
