import type { ViewerProps } from "../src";

import Viewer from "bpmn-js/lib/Viewer";
import MoveCanvasModule from "diagram-js/lib/navigation/movecanvas";
import ZoomScrollModule from "diagram-js/lib/navigation/zoomscroll";
import ModelingModule from "bpmn-js/lib/features/modeling";
import TooltipsModule from "diagram-js/lib/features/tooltips";

export function useInitViewer(props: ViewerProps, bpmnCanvasId: string) {
  const { additionalModules = [] } = props.initOptions;
  const viewer = new Viewer({
    container: document.getElementById(bpmnCanvasId)!,
    additionalModules: [MoveCanvasModule, ZoomScrollModule, ModelingModule, TooltipsModule, ...additionalModules]
  });
  return viewer;
}
