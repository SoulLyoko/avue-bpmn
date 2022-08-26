import type { BpmnBaseElement } from "bpmn-js";
import type { FormOption, FormColumn, FormGroup } from "@smallwei/avue";
import type { defaultFormData } from "~/defaults";
import type { UseBpmnStateReturn } from "~/composables/state";

export type BpmnState = UseBpmnStateReturn;

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
