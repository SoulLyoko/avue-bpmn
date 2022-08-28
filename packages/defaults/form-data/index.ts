import type {
  AssigneeListItem,
  ButtonListItem,
  FormpropertyListItem,
  PropertyListItem,
  SerialListItem,
  TaskListenerListItem,
  ExecutionListenerListItem,
  TimelimitListItem
} from "../options";

export const defaultFormData = {
  id: "",
  name: "",
  documentation: "",
  category: "",
  icon: "",
  skipFirstNode: "",
  rollbackNode: "",
  priority: "",
  backToRejecter: "",
  multiInstanceType: "",
  completionCondition: "",
  collection: "",
  class: "",
  async: "",
  elementVariable: "",
  sequenceFlowType: "",
  conditionExpression: "",
  skipExpression: "",
  assigneeList: [] as AssigneeListItem[],
  buttonList: [] as ButtonListItem[],
  executionListenerList: [] as ExecutionListenerListItem[],
  formpropertyList: [] as FormpropertyListItem[],
  propertyList: [] as PropertyListItem[],
  serialList: [] as SerialListItem[],
  taskListenerList: [] as TaskListenerListItem[],
  timelimitList: [] as TimelimitListItem[]
};
