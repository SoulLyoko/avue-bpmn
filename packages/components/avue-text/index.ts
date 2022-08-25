import { defineComponent } from "vue-demi";

import { h } from "~/utils";

export type AvueTextInstance = InstanceType<typeof AvueText>;

export const AvueText = defineComponent({
  name: "AvueText",
  props: {
    value: { type: String },
    modelValue: { type: String }
  },
  setup(props) {
    return () => h("span", {}, props.value || props.modelValue);
  }
});
