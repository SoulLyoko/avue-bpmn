import type { Shape } from "diagram-js/lib/model";
import type { ViewerProps } from "../src";
import type { ViewerState } from "./state";

import { watchEffect } from "vue-demi";

import { useMethods } from "~/composables";

export function useViewerData({ props, state }: { props: ViewerProps; state: ViewerState }) {
  const { viewer, elementRegistry, modeling, tooltips } = state;
  const { importXML } = useMethods(viewer);

  watchEffect(async () => {
    if (!props.xml) return;
    await importXML(props.xml);
    props.data.forEach(item => {
      const { elementId } = item;
      if (!elementId) return;
      const element = elementRegistry.value?.get(elementId);
      if (!element) return;

      if (!item.colors) return;
      modeling.value?.setColor([element], item.colors);

      if (!item.tooltips) return;
      const { html = "", position: { offsetX = 0, offsetY = 0 } = {} } = item.tooltips;
      const { x, y } = element as Shape;
      const position = { x: (x || 0) + (offsetX || 0), y: (y || 0) + (offsetY || 0) };
      tooltips.value?.add({ html, position });
    });
  });
}
