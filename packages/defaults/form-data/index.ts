import type {
  AssigneeItem,
  ButtonItem,
  FormpropertyItem,
  PropertyItem,
  SerialItem,
  ListenerItem,
  TimelimitItem
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
  flowType: "",
  conditionExpression: "",
  skipExpression: "",
  assignee: [] as AssigneeItem[],
  button: [] as ButtonItem[],
  executionListener: [] as ListenerItem[],
  formproperty: [] as FormpropertyItem[],
  property: [] as PropertyItem[],
  serial: [] as SerialItem[],
  taskListener: [] as ListenerItem[],
  timelimit: [] as TimelimitItem[]
};
