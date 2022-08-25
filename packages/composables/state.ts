import type { BpmnState } from "~/types";
import type { ModelerProps, ModelerEmitFn } from "..";

import { ref, watch, shallowRef, reactive, computed, isVue2 } from "vue-demi";

import { defaultOptions, defaultFormData } from "~/defaults";

export function useBpmnState({ props, emit }: { props: ModelerProps; emit: ModelerEmitFn }): BpmnState {
  const modeler = shallowRef();
  const modeling = shallowRef();
  const moddle = shallowRef();
  const elementRegistry = shallowRef();
  const element = shallowRef();
  const formRef = ref();
  const formData = ref<Record<string, any>>(Object.assign(defaultFormData, props.value, props.modelValue));
  const formOption = reactive({ menuBtn: false, span: 24, column: [], group: [] });
  const options = computed(() => props.formOptions || defaultOptions);
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
    options,
    props,
    prefix
  };
}
