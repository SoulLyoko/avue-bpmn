import type { BpmnFormColumnItem } from "~/types";

export const baseColumn: BpmnFormColumnItem[] = [
  {
    label: "节点id",
    prop: "id",
    readonly: true,
    updateFormData({ formData, businessObject }) {
      const { id } = businessObject;
      formData.value.id = id || "";
    },
    updateProperties({ formData, element, modeling }) {
      const { id } = formData.value;
      id && modeling.value?.updateProperties(element.value!, { id });
    }
  },
  {
    label: "节点名称",
    prop: "name",
    updateFormData({ formData, businessObject }) {
      const { name } = businessObject;
      formData.value.name = name || "";
    },
    updateProperties({ formData, element, modeling }) {
      const { name } = formData.value;
      modeling.value?.updateProperties(element.value!, { name: name || undefined });
    }
  },
  {
    label: "节点描述",
    prop: "documentation",
    updateFormData({ formData, businessObject }) {
      const { documentation } = businessObject;
      formData.value.documentation = documentation?.[0]?.text || "";
    },
    updateProperties({ formData, element, modeling, moddle }) {
      const { documentation } = formData.value;
      const documentationElement = moddle.value?.create("bpmn:Documentation", { text: documentation });
      modeling.value?.updateProperties(element.value!, {
        documentation: documentation ? [documentationElement] : undefined
      });
    }
  }
];
