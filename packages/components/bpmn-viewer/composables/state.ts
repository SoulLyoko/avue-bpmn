import type Viewer from "bpmn-js";
import type ModelingModule from "bpmn-js/lib/features/modeling";
import type ElementRegistry from "diagram-js/lib/core/ElementRegistry";
import type TooltipsModule from "diagram-js/lib/features/tooltips";

import { shallowRef } from "vue";

export type ViewerState = ReturnType<typeof useState>;

export function useState() {
  const viewer = shallowRef<Viewer>();
  const modeling = shallowRef<ModelingModule>();
  const elementRegistry = shallowRef<ElementRegistry>();
  const tooltips = shallowRef<TooltipsModule>();

  return { viewer, modeling, elementRegistry, tooltips };
}
