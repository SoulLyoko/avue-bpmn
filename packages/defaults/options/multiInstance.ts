import type { BpmnFormColumnItem } from "~/types";

const defaultCompletionCondition = "${nrOfCompletedInstances / nrOfInstances == 1}";
const defaultCollection = "${ysMultiInstanceHandler.getList(execution)}";
const defaultElementVariable = "assignee";

export const multiInstanceColumn: BpmnFormColumnItem[] = [
  {
    label: "多实例类型",
    prop: "multiInstanceType",
    type: "select",
    dicData: [
      { label: "并行多重事件", value: "parallel" },
      { label: "时序多重事件", value: "sequential" },
      { label: "循环", value: "standard" }
    ],
    updateFormData({ formData, businessObject }) {
      const { loopCharacteristics } = businessObject;
      if (loopCharacteristics) {
        if (loopCharacteristics.$type === "bpmn:MultiInstanceLoopCharacteristics") {
          formData.value.multiInstanceType = loopCharacteristics.isSequential ? "sequential" : "parallel";
        } else if (loopCharacteristics.$type === "bpmn:StandardLoopCharacteristics") {
          formData.value.multiInstanceType = "standard";
        } else {
          formData.value.multiInstanceType = "";
        }
      } else {
        formData.value.multiInstanceType = "";
      }
    },
    updateProperties({ formData, element, modeling, moddle }) {
      const { multiInstanceType } = formData.value;
      const createArgsMap = {
        parallel: ["bpmn:MultiInstanceLoopCharacteristics"],
        sequential: ["bpmn:MultiInstanceLoopCharacteristics", { isSequential: true }],
        standard: ["bpmn:StandardLoopCharacteristics"]
      };
      const args = createArgsMap[multiInstanceType as keyof typeof createArgsMap];
      const loopCharacteristics = args ? moddle.value?.create(...(args as [string, any])) : undefined;
      modeling.value?.updateProperties(element.value!, { loopCharacteristics });
      if (loopCharacteristics) {
        formData.value.completionCondition = formData.value.completionCondition || defaultCompletionCondition;
        formData.value.collection = formData.value.collection || defaultCollection;
        formData.value.elementVariable = formData.value.elementVariable || defaultElementVariable;
      } else {
        formData.value.completionCondition = "";
        formData.value.collection = "";
        formData.value.elementVariable = "";
      }
    }
  },
  {
    label: "完成条件",
    prop: "completionCondition",
    updateFormData({ formData, businessObject }) {
      const { loopCharacteristics } = businessObject;
      if (loopCharacteristics) {
        formData.value.completionCondition =
          loopCharacteristics.completionCondition?.body || defaultCompletionCondition;
      } else {
        formData.value.completionCondition = "";
      }
    },
    updateProperties({ formData, businessObject, element, modeling, moddle }) {
      const { loopCharacteristics } = businessObject;
      if (loopCharacteristics) {
        const { completionCondition } = formData.value;
        const newCondition = moddle.value?.create("bpmn:FormalExpression", { body: completionCondition });
        loopCharacteristics.completionCondition = newCondition;
        modeling.value?.updateProperties(element.value!, { loopCharacteristics });
      }
    }
  },
  {
    label: "集合",
    prop: "collection",
    updateFormData({ formData, businessObject, prefix }) {
      const { loopCharacteristics } = businessObject;
      if (loopCharacteristics) {
        const collection = loopCharacteristics.$attrs[prefix("collection")];
        formData.value.collection = collection || defaultCollection;
      } else {
        formData.value.collection = "";
      }
    },
    updateProperties({ formData, element, businessObject, modeling, prefix }) {
      const { loopCharacteristics } = businessObject;
      if (loopCharacteristics) {
        const { collection } = formData.value;
        loopCharacteristics.$attrs[prefix("collection")] = collection;
        modeling.value?.updateProperties(element.value!, { loopCharacteristics });
      }
    }
  },
  {
    label: "元素变量",
    prop: "elementVariable",
    updateFormData({ formData, businessObject, prefix }) {
      const { loopCharacteristics } = businessObject;
      if (loopCharacteristics) {
        const elementVariable = loopCharacteristics.$attrs[prefix("elementVariable")];
        formData.value.elementVariable = elementVariable || defaultElementVariable;
      } else {
        formData.value.elementVariable = "";
      }
    },
    updateProperties({ formData, element, businessObject, modeling, prefix }) {
      const { loopCharacteristics } = businessObject;
      if (loopCharacteristics) {
        const { elementVariable } = formData.value;
        loopCharacteristics.$attrs[prefix("elementVariable")] = elementVariable;
        modeling.value?.updateProperties(element.value!, { loopCharacteristics });
      }
    }
  }
];
