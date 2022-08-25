import type { PropType } from "vue-demi";
import type { PropTypes, EmitFn, BpmnFormGroupItem } from "~/types";
import type { ViewerOptions } from "diagram-js/lib/model";

import { defineComponent, onMounted, provide, isVue2 } from "vue-demi";
import Modeler from "bpmn-js/lib/Modeler";
import { uniqueId, merge } from "lodash-unified";

import { h, slot } from "~/utils";
import { BpmnTools } from "~/components/bpmn-tools";
import { BpmnForm } from "~/components/bpmn-form";
import { useBpmnState, useUpdateColumn, useModelerListener, useMethods } from "~/composables";
import customModules from "~/modules";
import customExtensions from "~/extensions";

export type ModelerProps = PropTypes<typeof modelerProps>;
export type ModelerEmits = typeof modelerEmits;
export type ModelerEmitFn = EmitFn<ModelerEmits>;
export type ModelerInstance = InstanceType<typeof BpmnModeler>;

export const modelerProps = {
  value: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
  modelValue: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
  xml: { type: String },
  prefix: { type: String as PropType<"activiti" | "camunda" | "flowable" | "bpmn">, default: "bpmn" },
  size: { type: String, default: isVue2 ? "small" : "default" },
  formpropertyList: { type: Array as PropType<any[]>, default: () => [] },
  buttonList: { type: Array as PropType<any[]>, default: () => [] },
  formOptions: { type: Object as PropType<Record<string, BpmnFormGroupItem[]>> },
  initOptions: { type: Object as PropType<ViewerOptions>, default: () => ({}) }
};

export const modelerEmits = {
  init: (e: Modeler) => e,
  input: (e: Record<string, any>) => e,
  "update:modelValue": (e: Record<string, any>) => e,
  "update:xml": (e: string) => e,
  "element-change": (e: any) => e
};

export const BpmnModeler = defineComponent({
  name: "BpmnModeler",
  props: modelerProps,
  emits: modelerEmits,
  setup(props, { emit, slots }) {
    const state = useBpmnState({ props, emit });
    provide("bpmnState", state);

    const { importXML } = useMethods(state.modeler);
    onMounted(() => {
      initModeler();
      useModelerListener({ state, emit });
      useUpdateColumn(state);
      props.xml && importXML(props.xml);
    });

    const bpmnCanvasId = uniqueId("bpmn-canvas");
    async function initModeler() {
      const { modeler, modeling, moddle, elementRegistry } = state;
      modeler.value = new Modeler(
        merge(
          {
            container: document.getElementById(bpmnCanvasId)!,
            additionalModules: [customModules],
            moddleExtensions: { [props.prefix]: customExtensions[props.prefix] }
          },
          props.initOptions
        )
      );
      modeling.value = modeler.value?.get("modeling");
      moddle.value = modeler.value?.get("moddle");
      elementRegistry.value = modeler.value?.get("elementRegistry");
      emit("init", modeler.value);
    }

    return () =>
      h("div", { class: "bpmn-modeler" }, [
        h("div", { class: "bpmn-canvas", attrs: { id: bpmnCanvasId } }),
        h(BpmnForm, { class: "bpmn-form", scopedSlots: slots }),
        h(BpmnTools, { class: "bpmn-tools" }, slot(slots["bpmn-tools"]))
      ]);
  }
});
