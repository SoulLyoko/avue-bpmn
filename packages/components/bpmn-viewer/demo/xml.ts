export default `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:flowable="http://flowable.org/bpmn" xmlns:activiti="http://activiti.org/bpmn" xmlns:camunda="http://camunda.org/schema/1.0/bpmn" id="Definitions_Uf5dUHW" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_mjMDg59" isExecutable="true" flowable:skipFirstNode="true">
    <bpmn:extensionElements>
      <flowable:property name="name" value="value" />
      <flowable:serial dateFormat="yyyyMMdd" suffixLength="4" startSequence="0" connector="-" cycle="none" name="" prefix="" />
    </bpmn:extensionElements>
    <bpmn:startEvent id="Event_mqvUhUn" name="开始">
      <bpmn:outgoing>Flow_wNgWBxh</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:sequenceFlow id="Flow_wNgWBxh" sourceRef="Event_mqvUhUn" targetRef="Activity_7xHv5cf" />
    <bpmn:userTask id="Activity_7xHv5cf" name="节点1">
      <bpmn:extensionElements>
        <flowable:property name="name" value="value" />
        <flowable:formproperty label="发送" prop="flow_pass" display="false" disabled="true" detail="true" required="true" />
        <flowable:timelimit name="green" min="10" max="365" />
        <flowable:timelimit name="yellow" min="5" max="10" />
        <flowable:timelimit name="red" min="0" max="5" />
        <flowable:button label="发送" prop="flow_pass" display="true" approval="false" />
        <flowable:assignee type="custom" value="applyUser" />
      </bpmn:extensionElements>
      <bpmn:incoming>Flow_wNgWBxh</bpmn:incoming>
      <bpmn:outgoing>Flow_1nj7n4u</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:userTask id="Activity_0dgoyky" name="节点2">
      <bpmn:extensionElements>
        <flowable:property name="name" value="value" />
        <flowable:formproperty label="发送" prop="flow_pass" display="false" disabled="true" detail="true" required="true" />
        <flowable:timelimit name="green" min="10" max="365" />
        <flowable:timelimit name="yellow" min="5" max="10" />
        <flowable:timelimit name="red" min="0" max="5" />
        <flowable:button label="发送" prop="flow_pass" display="true" approval="false" />
        <flowable:assignee type="custom" value="applyUser" />
      </bpmn:extensionElements>
      <bpmn:incoming>Flow_1nj7n4u</bpmn:incoming>
      <bpmn:outgoing>Flow_0t9mkhe</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:sequenceFlow id="Flow_1nj7n4u" sourceRef="Activity_7xHv5cf" targetRef="Activity_0dgoyky" />
    <bpmn:userTask id="Activity_1x00ct7" name="节点3">
      <bpmn:extensionElements>
        <flowable:property name="name" value="value" />
        <flowable:formproperty label="发送" prop="flow_pass" display="false" disabled="true" detail="true" required="true" />
        <flowable:timelimit name="green" min="10" max="365" />
        <flowable:timelimit name="yellow" min="5" max="10" />
        <flowable:timelimit name="red" min="0" max="5" />
        <flowable:button label="发送" prop="flow_pass" display="true" approval="false" />
        <flowable:assignee type="custom" value="applyUser" />
      </bpmn:extensionElements>
      <bpmn:incoming>Flow_0t9mkhe</bpmn:incoming>
      <bpmn:outgoing>Flow_12b1u3b</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:sequenceFlow id="Flow_0t9mkhe" sourceRef="Activity_0dgoyky" targetRef="Activity_1x00ct7" />
    <bpmn:endEvent id="Event_0bsd1ju">
      <bpmn:extensionElements>
        <flowable:property name="name" value="value" />
        <flowable:formproperty label="发送" prop="flow_pass" display="false" disabled="true" detail="true" required="true" />
      </bpmn:extensionElements>
      <bpmn:incoming>Flow_12b1u3b</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_12b1u3b" sourceRef="Activity_1x00ct7" targetRef="Event_0bsd1ju" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_mjMDg59">
      <bpmndi:BPMNShape id="Event_mqvUhUn_di" bpmnElement="Event_mqvUhUn">
        <dc:Bounds x="156" y="81" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="163" y="124" width="22" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_7xHv5cf_di" bpmnElement="Activity_7xHv5cf">
        <dc:Bounds x="250" y="59" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0dgoyky_di" bpmnElement="Activity_0dgoyky">
        <dc:Bounds x="410" y="59" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1x00ct7_di" bpmnElement="Activity_1x00ct7">
        <dc:Bounds x="570" y="59" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0bsd1ju_di" bpmnElement="Event_0bsd1ju">
        <dc:Bounds x="732" y="81" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_wNgWBxh_di" bpmnElement="Flow_wNgWBxh">
        <di:waypoint x="192" y="99" />
        <di:waypoint x="250" y="99" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1nj7n4u_di" bpmnElement="Flow_1nj7n4u">
        <di:waypoint x="350" y="99" />
        <di:waypoint x="410" y="99" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0t9mkhe_di" bpmnElement="Flow_0t9mkhe">
        <di:waypoint x="510" y="99" />
        <di:waypoint x="570" y="99" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_12b1u3b_di" bpmnElement="Flow_12b1u3b">
        <di:waypoint x="670" y="99" />
        <di:waypoint x="732" y="99" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;
