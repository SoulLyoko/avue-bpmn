import type { Connection } from "diagram-js/lib/model";
import type { BpmnFormColumnItem } from "~/types";

export const flowTypeColumn: BpmnFormColumnItem = {
  label: "流类型",
  prop: "flowType",
  type: "select",
  dicData: [
    { label: "序列流", value: "sequence" },
    { label: "默认流", value: "default" },
    { label: "条件流", value: "conditional" }
  ],
  updateFormData({ formData, businessObject }) {
    const { conditionExpression } = businessObject;
    if (conditionExpression) {
      formData.value.flowType = "conditional";
    } else if (businessObject.sourceRef.default) {
      formData.value.flowType = "default";
    } else {
      formData.value.flowType = "sequence";
    }
  },
  updateProperties({ formData, element, moddle, modeling }) {
    const { flowType, id } = formData.value;
    if (flowType === "conditional") {
      const conditionExpression = moddle.value?.create("bpmn:FormalExpression");
      modeling.value?.updateProperties(element.value!, { conditionExpression });
      formData.value.conditionExpression = formData.value.conditionExpression || `$\{condition=="${id}"}`;
    } else if (flowType === "default") {
      modeling.value?.updateProperties(element.value!, { conditionExpression: null });
      modeling.value?.updateProperties((element.value as Connection).source, { default: element.value });
      formData.value.conditionExpression = "";
    } else {
      modeling.value?.updateProperties(element.value!, { conditionExpression: null });
      modeling.value?.updateProperties((element.value as Connection).source, { default: element.value });
      modeling.value?.updateProperties((element.value as Connection).source, { default: null });
      formData.value.conditionExpression = "";
    }
  }
};

export const conditionExpressionColumn: BpmnFormColumnItem = {
  label: "条件表达式",
  prop: "conditionExpression",
  updateFormData({ formData, businessObject }) {
    const { conditionExpression, id } = businessObject;
    if (conditionExpression) {
      formData.value.conditionExpression = conditionExpression.body || `$\{condition=="${id}"}`;
    } else {
      formData.value.conditionExpression = "";
    }
  },
  updateProperties({ formData, element, moddle, modeling, businessObject }) {
    if (businessObject.conditionExpression) {
      const { conditionExpression } = formData.value;
      const newCondition = moddle.value?.create("bpmn:FormalExpression", { body: conditionExpression });
      modeling.value?.updateProperties(element.value!, { conditionExpression: newCondition });
    }
  }
};

export const sequenceFlowColumns = [flowTypeColumn, conditionExpressionColumn];
