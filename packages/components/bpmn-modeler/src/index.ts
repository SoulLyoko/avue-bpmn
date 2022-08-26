import type { PropType } from "vue-demi";
import type { PropTypes, EmitFn, BpmnFormGroupItem } from "~/types";
import type { Base, ViewerOptions } from "diagram-js/lib/model";
import type { AvueFormInstance } from "@smallwei/avue";

import { defineComponent, onMounted, provide, isVue2 } from "vue-demi";
import Modeler from "bpmn-js/lib/Modeler";
import { uniqueId, merge } from "lodash-unified";

import { h, slot, dynamicComponent } from "~/utils";
import { BpmnTools } from "~/components/bpmn-tools";
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
  formWidth: { type: String, default: "30%" },
  formOptions: { type: Object as PropType<Record<string, BpmnFormGroupItem[]>> },
  initOptions: { type: Object as PropType<ViewerOptions>, default: () => ({}) }
};

export const modelerEmits = {
  init: (e: Modeler) => e,
  input: (e: Record<string, any>) => e,
  "update:modelValue": (e: Record<string, any>) => e,
  "update:xml": (e: string) => e,
  "element-change": (e: Base) => e
};

export const BpmnModeler = defineComponent({
  name: "BpmnModeler",
  props: modelerProps,
  emits: modelerEmits,
  setup(props, { emit, slots }) {
    const state = useBpmnState({ props, emit });
    const { modeler, modeling, moddle, elementRegistry, formData, formOption, formRef } = state;
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

    const AvueForm = dynamicComponent("avue-form");
    return () =>
      h("div", { class: "bpmn-modeler" }, [
        h("div", { class: "bpmn-canvas", attrs: { id: bpmnCanvasId }, style: `width:calc(100% - ${props.formWidth})` }),
        h(AvueForm, {
          class: "bpmn-form",
          ref: (el: AvueFormInstance) => (formRef.value = el),
          props: { value: formData.value, modelValue: formData.value, option: formOption.value },
          on: {
            [isVue2 ? "input" : "update:modelValue"]: (v: Record<string, any>) => (formData.value = v)
          },
          scopedSlots: slots,
          style: `width:${props.formWidth}`
        }),
        h(BpmnTools, { props: { modeler: modeler.value, size: props.size } }, slot(slots["bpmn-tools"]))
      ]);
  }
});
