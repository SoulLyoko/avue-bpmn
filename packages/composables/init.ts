import type { BpmnState, ModelerProps, ModelerEmitFn } from "..";

import Modeler from "bpmn-js/lib/Modeler";
import tokenSimulationModule from "bpmn-js-token-simulation";
import bpmnlintModule from "bpmn-js-bpmnlint";
import minimapModule from "diagram-js-minimap";

import customModules from "~/modules";
import customExtensions from "~/extensions";

export function useInitModeler({
  state,
  props,
  emit,
  bpmnCanvasId
}: {
  state: BpmnState;
  props: ModelerProps;
  emit: ModelerEmitFn;
  bpmnCanvasId: string;
}) {
  const { modeler, modeling, moddle, elementRegistry } = state;
  const {
    additionalModules = [],
    moddleExtensions = [],
    simulation = true,
    linting,
    minimap = true
  } = props.initOptions;
  const initOptions = {
    container: document.getElementById(bpmnCanvasId)!,
    ...props.initOptions,
    additionalModules: [
      customModules,
      linting ? bpmnlintModule : {},
      simulation ? tokenSimulationModule : {},
      minimap ? minimapModule : {},
      ...additionalModules
    ],
    moddleExtensions: { [props.prefix]: customExtensions[props.prefix], ...moddleExtensions }
  };
  modeler.value = new Modeler(initOptions);
  modeling.value = modeler.value?.get("modeling");
  moddle.value = modeler.value?.get("moddle");
  elementRegistry.value = modeler.value?.get("elementRegistry");
  linting && modeler.value.get("linting")?.toggle();
  minimap && modeler.value.get("minimap")?.toggle();
  emit("update:modeler", modeler.value);
}
