import { uuid } from "~/utils";

export const defaultXml = () => {
  const processId = `Process_${uuid(7)}`;
  const startEventId = `Event_${uuid(7)}`;
  const flowId = `Flow_${uuid(7)}`;
  const taskId = `Activity_${uuid(7)}`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_0ko0f1k" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="9.3.2">
  <bpmn:process id="${processId}" isExecutable="true">
    <bpmn:startEvent id="${startEventId}" name="开始">
      <bpmn:outgoing>${flowId}</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:sequenceFlow id="${flowId}" sourceRef="${startEventId}" targetRef="${taskId}" />
    <bpmn:userTask id="${taskId}" name="发起人">
      <bpmn:incoming>${flowId}</bpmn:incoming>
    </bpmn:userTask>
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="${processId}">
      <bpmndi:BPMNEdge id="${flowId}_di" bpmnElement="${flowId}">
        <di:waypoint x="192" y="99" />
        <di:waypoint x="250" y="99" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="${startEventId}">
        <dc:Bounds x="156" y="81" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="163" y="124" width="22" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1n1g18l_di" bpmnElement="${taskId}">
        <dc:Bounds x="250" y="59" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;
};
