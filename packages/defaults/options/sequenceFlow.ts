import type { Connection } from "diagram-js/lib/model";
import type { BpmnFormColumnItem } from "~/types";

export const sequenceFlowTypeColumn: BpmnFormColumnItem = {
  label: "流类型",
  prop: "sequenceFlowType",
  type: "select",
  dicData: [
    { label: "序列流", value: "sequence" },
    { label: "默认流", value: "default" },
    { label: "条件流", value: "conditional" }
  ],
  updateFormData({ formData, businessObject }) {
    const { conditionExpression } = businessObject;
    if (conditionExpression) {
      formData.value.sequenceFlowType = "conditional";
    } else if (businessObject.sourceRef.default) {
      formData.value.sequenceFlowType = "default";
    } else {
      formData.value.sequenceFlowType = "sequence";
    }
  },
  updateProperties({ formData, element, moddle, modeling }) {
    const { sequenceFlowType, id } = formData.value;
    if (sequenceFlowType === "conditional") {
      const conditionExpression = moddle.value?.create("bpmn:FormalExpression");
      modeling.value?.updateProperties(element.value!, { conditionExpression });
      formData.value.conditionExpression = formData.value.conditionExpression || `$\{condition=="${id}"}`;
    } else if (sequenceFlowType === "default") {
      formData.value.conditionExpression = "";
      modeling.value?.updateProperties(element.value!, { conditionExpression: null });
      modeling.value?.updateProperties((element.value as Connection).source, { default: element.value });
    } else {
      formData.value.conditionExpression = "";
      modeling.value?.updateProperties(element.value!, { conditionExpression: null });
      modeling.value?.updateProperties((element.value as Connection).source, { default: null });
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

export const sequenceFlowColumns = [sequenceFlowTypeColumn, conditionExpressionColumn];
