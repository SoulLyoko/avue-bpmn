import type { PropType } from "vue-demi";
import type Viewer from "bpmn-js/lib/Viewer";
import type { ViewerOptions } from "diagram-js/lib/model";
import type { Colors } from "bpmn-js/lib/features/modeling/Modeling";
import type { PropTypes, EmitFn } from "~/types";

import { defineComponent, onMounted } from "vue-demi";
import { uniqueId } from "lodash-unified";

import { h } from "~/utils";
import { useState, useInitViewer, useViewerData } from "../composables";

export type ViewerProps = PropTypes<typeof ViewerProps>;
export type ViewerEmits = typeof ViewerEmits;
export type ViewerEmitFn = EmitFn<ViewerEmits>;
export type ViewerInstance = InstanceType<typeof BpmnViewer>;

export interface ViewerData {
  elementId?: string;
  colors?: Colors;
  tooltips?: Tootips;
}
interface Tootips {
  html?: string;
  position?: { offsetX?: number; offsetY?: number };
}

export const ViewerProps = {
  xml: { type: String },
  data: { type: Array as PropType<ViewerData[]>, default: () => [] },
  initOptions: {
    type: Object as PropType<ViewerOptions>,
    default: () => ({})
  }
};

export const ViewerEmits = {
  "update:viewer": (e: Viewer) => e
};

export interface ViewerState {}

export const BpmnViewer = defineComponent({
  name: "BpmnViewer",
  props: ViewerProps,
  emits: ViewerEmits,
  setup(props, { emit }) {
    const state = useState();

    const canvasId = uniqueId("bpmn-viewer-canvas");
    onMounted(() => {
      useInitViewer({ props, emit, state, canvasId });
      useViewerData({ props, state });
    });

    return () =>
      h("div", { class: "bpmn-viewer" }, [
        h("div", {
          class: "bpmn-canvas",
          attrs: { id: canvasId }
        })
      ]);
  }
});
