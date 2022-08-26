import type Modeler from "bpmn-js/lib/Modeler";
import type Modeling from "bpmn-js/lib/features/modeling/Modeling";
import type Moddle from "moddle/lib/moddle";
import type ElementRegistry from "diagram-js/lib/core/ElementRegistry";
import type { BpmnBaseElement } from "bpmn-js";
import type { Base } from "diagram-js/lib/model";
import type { AvueFormInstance, FormOption, FormColumn, FormGroup } from "@smallwei/avue";
import type { ComputedRef, Ref } from "vue-demi";
import type { ModelerProps } from "~/components/bpmn-modeler";
import type { defaultFormData } from "~/defaults";

export interface BpmnState {
  modeler: Ref<Modeler | undefined>;
  modeling: Ref<Modeling | undefined>;
  moddle: Ref<Moddle | undefined>;
  elementRegistry: Ref<ElementRegistry | undefined>;
  element: Ref<Base | undefined>;
  formRef: Ref<AvueFormInstance | undefined>;
  formData: Ref<BpmnFormData>;
  formOption: BpmnFormOption;
  props: ModelerProps;
  prefix: (key: string) => string;
}

export type BpmnFormOption = Omit<FormOption, "column" | "group"> & {
  column: BpmnFormColumnItem[];
  group: BpmnFormGroupItem[];
};
export type BpmnFormData = Partial<typeof defaultFormData> & Record<string, any>;
export interface BpmnFormColumnItem extends FormColumn {
  updateFormData?(state: BpmnState & { businessObject: BpmnBaseElement; $attrs: Record<string, any> }): void;
  updateProperties?(state: BpmnState & { businessObject: BpmnBaseElement; $attrs: Record<string, any> }): void;
}
export interface BpmnFormGroupItem extends FormGroup {
  column?: BpmnFormColumnItem[];
}
export type BpmnFormOptions = Record<string, BpmnFormGroupItem[]>;
