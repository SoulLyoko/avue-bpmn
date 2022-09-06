import type { BpmnBaseElement } from "bpmn-js";
import type { FormOption, FormColumn, FormGroup } from "@smallwei/avue";
import type { defaultFormData } from "~/defaults";
import type { useModelerState } from "~/components/bpmn-modeler/src/composables/state";

export type ModelerState = ReturnType<typeof useModelerState>;

// #region BpmnTypes
export type BpmnFormOption = Omit<FormOption, "column" | "group"> & {
  column: BpmnFormColumnItem[];
  group: BpmnFormGroupItem[];
};
export type BpmnFormData = Partial<typeof defaultFormData> & Record<string, any>;
export interface BpmnFormColumnItem extends FormColumn {
  updateFormData?(state: ModelerState & { businessObject: BpmnBaseElement; $attrs: Record<string, any> }): void;
  updateProperties?(state: ModelerState & { businessObject: BpmnBaseElement; $attrs: Record<string, any> }): void;
}
export interface BpmnFormGroupItem extends FormGroup {
  column?: BpmnFormColumnItem[];
}
export type BpmnFormOptions = Record<string, BpmnFormGroupItem[]>;
// #endregion BpmnTypes
