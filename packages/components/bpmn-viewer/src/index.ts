import type { PropType } from "vue-demi";
import type Viewer from "bpmn-js/lib/Viewer";
import type { ViewerOptions } from "diagram-js/lib/model";
import type { Colors } from "bpmn-js/lib/features/modeling/Modeling";
import type { PropTypes, EmitFn } from "~/types";

import { defineComponent, onMounted, shallowRef } from "vue-demi";
import { uniqueId } from "lodash-unified";

import { h } from "~/utils";
import { useInitViewer } from "../composables";
import { useMethods } from "~/composables";

export type ViewerProps = PropTypes<typeof ViewerProps>;
export type ViewerEmits = typeof ViewerEmits;
export type ViewerEmitFn = EmitFn<ViewerEmits>;
export type ViewerInstance = InstanceType<typeof BpmnViewer>;

export interface ViewerDataItem {
  elementId?: string;
  colors?: Colors;
  tootips?: Tootips;
}
interface Tootips {
  html?: string;
  position?: { x?: number; y?: number };
}

export const ViewerProps = {
  xml: { type: String },
  data: { type: Array },
  initOptions: {
    type: Object as PropType<ViewerOptions>,
    default: () => ({})
  }
};

export const ViewerEmits = {
  "update:viewer": (e: Viewer) => e
};

export const BpmnViewer = defineComponent({
  name: "BpmnViewer",
  props: ViewerProps,
  emits: ViewerEmits,
  setup(props, { emit }) {
    const viewer = shallowRef<Viewer>();

    const { importXML } = useMethods(viewer);
    const bpmnCanvasId = uniqueId("bpmn-viewer-canvas");
    onMounted(() => {
      viewer.value = useInitViewer(props, bpmnCanvasId);
      emit("update:viewer", viewer.value);
      props.xml && importXML(props.xml);
    });

    return () => h("div", { class: "bpmn-viewer" }, [h("div", { class: "bpmn-canvas", attrs: { id: bpmnCanvasId } })]);
  }
});
