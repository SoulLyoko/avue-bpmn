import type Modeler from "bpmn-js/lib/Modeler";
import type { PropType } from "vue-demi";

import { defineComponent, computed } from "vue-demi";

import { dynamicComponent, h } from "~/utils";
import { useInject } from "~/composables";

export type BpmnSelectInstance = InstanceType<typeof BpmnSelect>;

export const BpmnSelect = defineComponent({
  name: "BpmnSelect",
  inheritAttrs: false,
  props: {
    modeler: { type: Object as PropType<Modeler> },
    filterType: { type: String }
  },
  // @ts-ignore
  setup(props, { attrs, listeners }) {
    const taskNodes = computed(() => {
      const state = useInject();
      const modeler = props.modeler || state.modeler.value;
      const elementRegistry = modeler?.get("elementRegistry");
      return (
        elementRegistry
          ?.filter(e => (props.filterType ? e.type === props.filterType : true))
          ?.map(({ businessObject }) => {
            const { name, id } = businessObject;
            return { label: name || id, value: id };
          }) ?? []
      );
    });

    const AvueSelect = dynamicComponent("avue-select");
    return () => h(AvueSelect, { props: { ...attrs, dic: taskNodes.value }, on: { ...listeners } });
  }
});
