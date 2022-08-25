import { defineComponent, computed } from "vue-demi";

import { dynamicComponent, h } from "~/utils";
import { useInject } from "~/composables";

export type UserTaskSelectInstance = InstanceType<typeof UserTaskSelect>;

export const UserTaskSelect = defineComponent({
  name: "UserTaskSelect",
  inheritAttrs: false,
  // @ts-ignore
  setup(props, { attrs, listeners }) {
    const { elementRegistry } = useInject();
    const taskNodes = computed(() => {
      return (
        elementRegistry.value
          ?.filter(e => e.type === "bpmn:UserTask")
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
