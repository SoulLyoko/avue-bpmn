import type { PropTypes, EmitFn } from "~/types";

import { defineComponent, isVue2 } from "vue-demi";

import { dynamicComponent, h } from "~/utils";
import { useInject } from "~/composables";

export type FormProps = PropTypes<typeof formProps>;
export type FormEmits = typeof formEmits;
export type FormEmitFn = EmitFn<FormEmits>;
export type FormInstance = InstanceType<typeof BpmnForm>;

export const formProps = {};

export const formEmits = {};

export const BpmnForm = defineComponent({
  name: "BpmnForm",
  props: formProps,
  emits: formEmits,
  setup(props, { slots }) {
    const AvueForm = dynamicComponent("avue-form");
    const { formData, formOption } = useInject();

    function onUpdateFormData(val: any) {
      if (val instanceof InputEvent) return;
      formData.value = val;
    }

    return () =>
      h(AvueForm, {
        props: { value: formData.value, modelValue: formData.value, option: formOption },
        on: isVue2 ? { input: onUpdateFormData } : { "update:modelValue": onUpdateFormData },
        scopedSlots: slots
      });
  }
});
