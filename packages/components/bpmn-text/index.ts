import { defineComponent } from "vue-demi";

import { h } from "~/utils";

export type BpmnTextInstance = InstanceType<typeof BpmnText>;

export const BpmnText = defineComponent({
  name: "BpmnText",
  inheritAttrs: false,
  props: {
    value: { type: String },
    modelValue: { type: String }
  },
  setup(props) {
    return () => h("span", {}, props.value || props.modelValue);
  }
});
