import { defineComponent, computed, isVue2 } from "vue-demi";

import { h, dynamicComponent } from "~/utils";

export type BpmnCheckboxInstance = InstanceType<typeof BpmnCheckbox>;

export const BpmnCheckbox = defineComponent({
  name: "BpmnCheckbox",
  inheritAttrs: false,
  props: {
    value: { type: [String, Boolean] },
    modelValue: { type: [String, Boolean] }
  },
  emits: {
    input: (e: string) => e,
    "update:modelValue": (e: string) => e
  },
  setup(props, { emit }) {
    const modelValue = computed(() => {
      const v = props[isVue2 ? "value" : "modelValue"];
      return v === "true" || v === true;
    });

    const ElCheckbox = dynamicComponent("el-checkbox");
    return () =>
      h(ElCheckbox, {
        props: {
          value: modelValue.value,
          modelValue: modelValue.value
        },
        on: {
          input: (v: string | boolean) => emit("input", String(v)),
          "update:modelValue": (v: string | boolean) => emit("update:modelValue", String(v))
        }
      });
  }
});
