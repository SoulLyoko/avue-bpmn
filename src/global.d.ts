declare module "vue" {
  export interface GlobalComponents {
    BpmnModeler: typeof import("avue-bpmn")["BpmnModeler"];
  }
}

export {};
