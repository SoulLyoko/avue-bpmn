import type { PropType } from "vue-demi";
import type Modeler from "bpmn-js/lib/Modeler";
import type { Base, ViewerOptions } from "diagram-js/lib/model";
import type { AvueFormInstance } from "@smallwei/avue";
import type { PropTypes, EmitFn, BpmnFormGroupItem } from "~/types";

import { defineComponent, onMounted, provide, isVue2 } from "vue-demi";
import { uniqueId } from "lodash-unified";

import { h, slot, dynamicComponent } from "~/utils";
import { BpmnTools } from "~/components/bpmn-tools";
import { useMethods } from "~/composables";
import { useInitModeler, useModelerState, useUpdateColumn, useModelerListener } from "./composables";

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
  formOptions: { type: Object as PropType<Record<string, BpmnFormGroupItem[]>>, default: () => ({}) },
  initOptions: {
    type: Object as PropType<
      ViewerOptions & {
        simulation?: boolean;
        linting?: { bpmnlint?: any };
        minimap?: boolean;
      }
    >,
    default: () => ({})
  }
};

export const modelerEmits = {
  input: (e: Record<string, any>) => e,
  "update:modelValue": (e: Record<string, any>) => e,
  "update:modeler": (e: Modeler) => e,
  "update:element": (e: Base) => e,
  "update:xml": (e: string) => e
};

export const BpmnModeler = defineComponent({
  name: "BpmnModeler",
  props: modelerProps,
  emits: modelerEmits,
  setup(props, { emit, slots }) {
    const state = useModelerState({ props, emit });
    const { modeler, formData, formOption, formRef } = state;
    provide("modelerState", state);

    const { importXML } = useMethods(state.modeler);
    const bpmnCanvasId = uniqueId("bpmn-modeler-canvas");
    onMounted(() => {
      useInitModeler({ props, state, emit, bpmnCanvasId });
      useModelerListener({ state, emit });
      useUpdateColumn(state);
      props.xml && importXML(props.xml);
    });

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
