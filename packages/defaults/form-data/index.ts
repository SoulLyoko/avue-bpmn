import type { AssigneeItem, FormpropertyItem, PropertyItem, SerialItem, ButtonItem } from "../options";

export const defaultFormData = {
  id: "",
  name: "",
  categoryId: "",
  modelKey: "",
  icon: "",
  documentation: "",
  description: "",
  formKey: "",
  priority: "",
  rollbackNode: "",
  backToRejecter: "",
  assignee: "",
  sequenceFlowType: "",
  conditionExpression: "",
  skipExpression: "",
  multiInstanceType: "",
  completionCondition: "",
  collection: "",
  elementVariable: "",
  class: "",
  async: "",
  serialList: [] as SerialItem[],
  buttonList: [] as ButtonItem[],
  assigneeList: [] as AssigneeItem[],
  taskListenerList: [] as any[],
  executionListenerList: [] as any[],
  propertyList: [] as PropertyItem[],
  timelimitList: [] as any[],
  formpropertyList: [] as FormpropertyItem[]
};