import{d as r,o,c,u,a as k,b as m,h as d,j as n,e,w as b,k as p,f as t}from"./app.52899705.js";var y=`<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:flowable="http://flowable.org/bpmn" xmlns:activiti="http://activiti.org/bpmn" xmlns:camunda="http://camunda.org/schema/1.0/bpmn" id="Definitions_Uf5dUHW" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_mjMDg59" isExecutable="true" flowable:skipFirstNode="true">
    <bpmn:extensionElements>
      <flowable:property name="name" value="value" />
      <flowable:serial dateFormat="yyyyMMdd" suffixLength="4" startSequence="0" connector="-" cycle="none" name="" prefix="" />
    </bpmn:extensionElements>
    <bpmn:startEvent id="Event_mqvUhUn" name="\u5F00\u59CB">
      <bpmn:outgoing>Flow_wNgWBxh</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:sequenceFlow id="Flow_wNgWBxh" sourceRef="Event_mqvUhUn" targetRef="Activity_7xHv5cf" />
    <bpmn:userTask id="Activity_7xHv5cf" name="\u8282\u70B91">
      <bpmn:extensionElements>
        <flowable:property name="name" value="value" />
        <flowable:formproperty label="\u53D1\u9001" prop="flow_pass" display="false" disabled="true" detail="true" required="true" />
        <flowable:timelimit name="green" min="10" max="365" />
        <flowable:timelimit name="yellow" min="5" max="10" />
        <flowable:timelimit name="red" min="0" max="5" />
        <flowable:button label="\u53D1\u9001" prop="flow_pass" display="true" approval="false" />
        <flowable:assignee type="custom" value="applyUser" />
      </bpmn:extensionElements>
      <bpmn:incoming>Flow_wNgWBxh</bpmn:incoming>
      <bpmn:outgoing>Flow_1nj7n4u</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:userTask id="Activity_0dgoyky" name="\u8282\u70B92">
      <bpmn:extensionElements>
        <flowable:property name="name" value="value" />
        <flowable:formproperty label="\u53D1\u9001" prop="flow_pass" display="false" disabled="true" detail="true" required="true" />
        <flowable:timelimit name="green" min="10" max="365" />
        <flowable:timelimit name="yellow" min="5" max="10" />
        <flowable:timelimit name="red" min="0" max="5" />
        <flowable:button label="\u53D1\u9001" prop="flow_pass" display="true" approval="false" />
        <flowable:assignee type="custom" value="applyUser" />
      </bpmn:extensionElements>
      <bpmn:incoming>Flow_1nj7n4u</bpmn:incoming>
      <bpmn:outgoing>Flow_0t9mkhe</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:sequenceFlow id="Flow_1nj7n4u" sourceRef="Activity_7xHv5cf" targetRef="Activity_0dgoyky" />
    <bpmn:userTask id="Activity_1x00ct7" name="\u8282\u70B93">
      <bpmn:extensionElements>
        <flowable:property name="name" value="value" />
        <flowable:formproperty label="\u53D1\u9001" prop="flow_pass" display="false" disabled="true" detail="true" required="true" />
        <flowable:timelimit name="green" min="10" max="365" />
        <flowable:timelimit name="yellow" min="5" max="10" />
        <flowable:timelimit name="red" min="0" max="5" />
        <flowable:button label="\u53D1\u9001" prop="flow_pass" display="true" approval="false" />
        <flowable:assignee type="custom" value="applyUser" />
      </bpmn:extensionElements>
      <bpmn:incoming>Flow_0t9mkhe</bpmn:incoming>
      <bpmn:outgoing>Flow_12b1u3b</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:sequenceFlow id="Flow_0t9mkhe" sourceRef="Activity_0dgoyky" targetRef="Activity_1x00ct7" />
    <bpmn:endEvent id="Event_0bsd1ju">
      <bpmn:extensionElements>
        <flowable:property name="name" value="value" />
        <flowable:formproperty label="\u53D1\u9001" prop="flow_pass" display="false" disabled="true" detail="true" required="true" />
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
</bpmn:definitions>`;const g=r({__name:"basic",setup(l){const s=[{elementId:"Event_mqvUhUn",colors:{fill:"lightgreen",stroke:"black"}},{elementId:"Flow_wNgWBxh",colors:{stroke:"lightgreen"}},{elementId:"Activity_7xHv5cf",colors:{fill:"lightgreen",stroke:"black"},tooltips:{html:`<div style="width:120px;text-align:center;font-size:14px;font-weight:bold;">
            <div>\u5F20\u4E09</div>
            <div>2022-08-31 09:30</div>
            <div>\u610F\u89C1: \u53D1\u8D77</div>
          </div>`,position:{offsetX:-10,offsetY:80}}},{elementId:"Flow_1nj7n4u",colors:{stroke:"lightgreen"}},{elementId:"Activity_0dgoyky",colors:{fill:"lightblue",stroke:"black"},tooltips:{html:`<div style="width:120px;text-align:center;font-size:14px;font-weight:bold;">
            <div>\u674E\u56DB</div>
          </div>`,position:{offsetX:-10,offsetY:80}}},{elementId:"Flow_0t9mkhe"},{elementId:"Activity_1x00ct7",colors:{fill:"pink",stroke:"black"},tooltips:{html:`<div style="width:120px;text-align:center;font-size:14px;font-weight:bold;">
            <div>\u738B\u4E94</div>
            <div>2022-08-31 10:30</div>
            <div>\u610F\u89C1: \u9000\u56DE</div>
          </div>`,position:{offsetX:-10,offsetY:80}}}];return(i,a)=>(o(),c(k("BpmnViewer"),{xml:u(y),data:s,style:{height:"400px"}},null,8,["xml"]))}}),h=p("",3),w=n("div",{class:"language-vue"},[n("pre",null,[n("code",null,[n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),t("template")]),n("span",{class:"token punctuation"},">")]),t(`
  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),t("component")]),t(),n("span",{class:"token attr-name"},"is"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),t("BpmnViewer"),n("span",{class:"token punctuation"},'"')]),t(),n("span",{class:"token attr-name"},":xml"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),t("xml"),n("span",{class:"token punctuation"},'"')]),t(),n("span",{class:"token attr-name"},":data"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),t("viewerData"),n("span",{class:"token punctuation"},'"')]),t(),n("span",{class:"token special-attr"},[n("span",{class:"token attr-name"},"style"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),n("span",{class:"token value css language-css"},[n("span",{class:"token property"},"height"),n("span",{class:"token punctuation"},":"),t(" 400px")]),n("span",{class:"token punctuation"},'"')])]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),t("component")]),n("span",{class:"token punctuation"},">")]),t(`
  `),n("span",{class:"token comment"},'<!-- <BpmnViewer :xml="xml" :data="viewerData" style="height: 400px"></BpmnViewer> -->'),t(`
`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),t("template")]),n("span",{class:"token punctuation"},">")]),t(`

`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),t("script")]),t(),n("span",{class:"token attr-name"},"setup"),t(),n("span",{class:"token attr-name"},"lang"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),t("ts"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token script"},[n("span",{class:"token language-javascript"},[t(`
`),n("span",{class:"token keyword"},"import"),t(" xml "),n("span",{class:"token keyword"},"from"),t(),n("span",{class:"token string"},'"./xml"'),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token comment"},'// import { BpmnViewer } from "avue-bpmn";'),t(`
`),n("span",{class:"token comment"},'// import "avue-bpmn/styles/bpmn-viewer.scss";'),t(`

`),n("span",{class:"token keyword"},"const"),t(" viewerData "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token punctuation"},"["),t(`
  `),n("span",{class:"token punctuation"},"{"),t(),n("span",{class:"token literal-property property"},"elementId"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token string"},'"Event_mqvUhUn"'),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token literal-property property"},"colors"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token punctuation"},"{"),t(),n("span",{class:"token literal-property property"},"fill"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token string"},'"lightgreen"'),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token literal-property property"},"stroke"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token string"},'"black"'),t(),n("span",{class:"token punctuation"},"}"),t(),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),t(`
  `),n("span",{class:"token punctuation"},"{"),t(),n("span",{class:"token literal-property property"},"elementId"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token string"},'"Flow_wNgWBxh"'),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token literal-property property"},"colors"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token punctuation"},"{"),t(),n("span",{class:"token literal-property property"},"stroke"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token string"},'"lightgreen"'),t(),n("span",{class:"token punctuation"},"}"),t(),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),t(`
  `),n("span",{class:"token punctuation"},"{"),t(`
    `),n("span",{class:"token literal-property property"},"elementId"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token string"},'"Activity_7xHv5cf"'),n("span",{class:"token punctuation"},","),t(`
    `),n("span",{class:"token literal-property property"},"colors"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token punctuation"},"{"),t(),n("span",{class:"token literal-property property"},"fill"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token string"},'"lightgreen"'),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token literal-property property"},"stroke"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token string"},'"black"'),t(),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),t(`
    `),n("span",{class:"token literal-property property"},"tooltips"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token punctuation"},"{"),t(`
      `),n("span",{class:"token literal-property property"},"html"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token template-string"},[n("span",{class:"token template-punctuation string"},"`"),n("span",{class:"token string"},`<div style="width:120px;text-align:center;font-size:14px;font-weight:bold;">
            <div>\u5F20\u4E09</div>
            <div>2022-08-31 09:30</div>
            <div>\u610F\u89C1: \u53D1\u8D77</div>
          </div>`),n("span",{class:"token template-punctuation string"},"`")]),n("span",{class:"token punctuation"},","),t(`
      `),n("span",{class:"token literal-property property"},"position"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token punctuation"},"{"),t(),n("span",{class:"token literal-property property"},"offsetX"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token operator"},"-"),n("span",{class:"token number"},"10"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token literal-property property"},"offsetY"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token number"},"80"),t(),n("span",{class:"token punctuation"},"}"),t(`
    `),n("span",{class:"token punctuation"},"}"),t(`
  `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),t(`
  `),n("span",{class:"token punctuation"},"{"),t(),n("span",{class:"token literal-property property"},"elementId"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token string"},'"Flow_1nj7n4u"'),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token literal-property property"},"colors"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token punctuation"},"{"),t(),n("span",{class:"token literal-property property"},"stroke"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token string"},'"lightgreen"'),t(),n("span",{class:"token punctuation"},"}"),t(),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),t(`
  `),n("span",{class:"token punctuation"},"{"),t(`
    `),n("span",{class:"token literal-property property"},"elementId"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token string"},'"Activity_0dgoyky"'),n("span",{class:"token punctuation"},","),t(`
    `),n("span",{class:"token literal-property property"},"colors"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token punctuation"},"{"),t(),n("span",{class:"token literal-property property"},"fill"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token string"},'"lightblue"'),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token literal-property property"},"stroke"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token string"},'"black"'),t(),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),t(`
    `),n("span",{class:"token literal-property property"},"tooltips"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token punctuation"},"{"),t(`
      `),n("span",{class:"token literal-property property"},"html"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token template-string"},[n("span",{class:"token template-punctuation string"},"`"),n("span",{class:"token string"},`<div style="width:120px;text-align:center;font-size:14px;font-weight:bold;">
            <div>\u674E\u56DB</div>
          </div>`),n("span",{class:"token template-punctuation string"},"`")]),n("span",{class:"token punctuation"},","),t(`
      `),n("span",{class:"token literal-property property"},"position"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token punctuation"},"{"),t(),n("span",{class:"token literal-property property"},"offsetX"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token operator"},"-"),n("span",{class:"token number"},"10"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token literal-property property"},"offsetY"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token number"},"80"),t(),n("span",{class:"token punctuation"},"}"),t(`
    `),n("span",{class:"token punctuation"},"}"),t(`
  `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),t(`
  `),n("span",{class:"token punctuation"},"{"),t(),n("span",{class:"token literal-property property"},"elementId"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token string"},'"Flow_0t9mkhe"'),t(),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),t(`
  `),n("span",{class:"token punctuation"},"{"),t(`
    `),n("span",{class:"token literal-property property"},"elementId"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token string"},'"Activity_1x00ct7"'),n("span",{class:"token punctuation"},","),t(`
    `),n("span",{class:"token literal-property property"},"colors"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token punctuation"},"{"),t(),n("span",{class:"token literal-property property"},"fill"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token string"},'"pink"'),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token literal-property property"},"stroke"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token string"},'"black"'),t(),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),t(`
    `),n("span",{class:"token literal-property property"},"tooltips"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token punctuation"},"{"),t(`
      `),n("span",{class:"token literal-property property"},"html"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token template-string"},[n("span",{class:"token template-punctuation string"},"`"),n("span",{class:"token string"},`<div style="width:120px;text-align:center;font-size:14px;font-weight:bold;">
            <div>\u738B\u4E94</div>
            <div>2022-08-31 10:30</div>
            <div>\u610F\u89C1: \u9000\u56DE</div>
          </div>`),n("span",{class:"token template-punctuation string"},"`")]),n("span",{class:"token punctuation"},","),t(`
      `),n("span",{class:"token literal-property property"},"position"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token punctuation"},"{"),t(),n("span",{class:"token literal-property property"},"offsetX"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token operator"},"-"),n("span",{class:"token number"},"10"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token literal-property property"},"offsetY"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token number"},"80"),t(),n("span",{class:"token punctuation"},"}"),t(`
    `),n("span",{class:"token punctuation"},"}"),t(`
  `),n("span",{class:"token punctuation"},"}"),t(`
`),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},";"),t(`
`)])]),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),t("script")]),n("span",{class:"token punctuation"},">")]),t(`
`)])])],-1),v=p("",4),x='{"title":"BpmnViewer","description":"","frontmatter":{},"headers":[{"level":2,"title":"Basic","slug":"basic"},{"level":2,"title":"Props","slug":"props"},{"level":2,"title":"Type Definition","slug":"type-definition"}],"relativePath":"components/bpmn-viewer/demo/index.md"}',f={},B=Object.assign(f,{__name:"index",setup(l){return(s,i)=>{const a=m("code-details");return o(),d("div",null,[h,n("p",null,[e(g)]),e(a,null,{default:b(()=>[w]),_:1}),v])}}});export{x as __pageData,B as default};
