import type { BpmnFormOption, BpmnFormData } from "~/types";
import type { ModelerProps, ModelerEmitFn } from "..";
import type Modeler from "bpmn-js/lib/Modeler";
import type Modeling from "bpmn-js/lib/features/modeling/Modeling";
import type Moddle from "moddle/lib/moddle";
import type ElementRegistry from "diagram-js/lib/core/ElementRegistry";
import type { Base } from "diagram-js/lib/model";
import type { AvueFormInstance } from "@smallwei/avue";

import { ref, watch, shallowRef, isVue2 } from "vue-demi";

export function useModelerState({ props, emit }: { props: ModelerProps; emit: ModelerEmitFn }) {
  const modeler = shallowRef<Modeler>();
  const modeling = shallowRef<Modeling>();
  const moddle = shallowRef<Moddle>();
  const elementRegistry = shallowRef<ElementRegistry>();
  const element = shallowRef<Base>();
  const formRef = ref<AvueFormInstance>();
  const formData = ref<BpmnFormData>(isVue2 ? props.value : props.modelValue);
  const formOption = ref<BpmnFormOption>({ menuBtn: false, span: 24, size: props.size, column: [], group: [] });
  const prefix = (key: string) => (props.prefix ? `${props.prefix}:${key}` : key);

  watch(
    () => (isVue2 ? props.value : props.modelValue),
    val => (formData.value = val),
    { deep: true }
  );
  watch(
    () => formData.value,
    val => (isVue2 ? emit("input", val) : emit("update:modelValue", val)),
    { deep: true }
  );

  return {
    modeler,
    modeling,
    moddle,
    elementRegistry,
    element,
    formData,
    formOption,
    formRef,
    props,
    prefix
  };
}
