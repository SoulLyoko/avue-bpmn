declare module "vue" {
  export interface GlobalComponents {
    BpmnModeler: typeof import("avue-bpmn")["BpmnModeler"];
    BpmnViewer: typeof import("avue-bpmn")["BpmnViewer"];
    BpmnTools: typeof import("avue-bpmn")["BpmnTools"];
    BpmnSelect: typeof import("avue-bpmn")["BpmnSelect"];
    BpmnCheckbox: typeof import("avue-bpmn")["BpmnCheckbox"];
    BpmnText: typeof import("avue-bpmn")["BpmnText"];
  }
}

export {};
