import type { ViewerProps, ViewerEmitFn } from "../src";
import type { ViewerState } from ".";

import Viewer from "bpmn-js/lib/Viewer";
import MoveCanvasModule from "diagram-js/lib/navigation/movecanvas";
import ZoomScrollModule from "diagram-js/lib/navigation/zoomscroll";
import ModelingModule from "bpmn-js/lib/features/modeling";
import TooltipsModule from "diagram-js/lib/features/tooltips";

export function useInitViewer({
  props,
  emit,
  state,
  canvasId
}: {
  props: ViewerProps;
  emit: ViewerEmitFn;
  state: ViewerState;
  canvasId: string;
}) {
  const { viewer, modeling, tooltips, elementRegistry } = state;
  const { additionalModules = [] } = props.initOptions;
  viewer.value = new Viewer({
    container: document.getElementById(canvasId)!,
    additionalModules: [MoveCanvasModule, ZoomScrollModule, ModelingModule, TooltipsModule, ...additionalModules]
  });
  modeling.value = viewer.value.get("modeling");
  tooltips.value = viewer.value.get("tooltips");
  elementRegistry.value = viewer.value.get("elementRegistry");
  emit("update:viewer", viewer.value);
}
