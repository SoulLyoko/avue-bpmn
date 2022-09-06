<template>
  <component is="BpmnViewer" :xml="xml" :data="viewerData" style="height: 400px"></component>
  <!-- <BpmnViewer :xml="xml" :data="viewerData" style="height: 400px"></BpmnViewer> -->
</template>

<script setup lang="ts">
import xml from "./xml";
// import { BpmnViewer } from "avue-bpmn";
// import "avue-bpmn/styles/bpmn-viewer.scss";

const viewerData = [
  { elementId: "Event_mqvUhUn", colors: { fill: "lightgreen", stroke: "black" } },
  { elementId: "Flow_wNgWBxh", colors: { stroke: "lightgreen" } },
  {
    elementId: "Activity_7xHv5cf",
    colors: { fill: "lightgreen", stroke: "black" },
    tooltips: {
      html: `<div style="width:120px;text-align:center;font-size:14px;font-weight:bold;">
            <div>张三</div>
            <div>2022-08-31 09:30</div>
            <div>意见: 发起</div>
          </div>`,
      position: { offsetX: -10, offsetY: 80 }
    }
  },
  { elementId: "Flow_1nj7n4u", colors: { stroke: "lightgreen" } },
  {
    elementId: "Activity_0dgoyky",
    colors: { fill: "lightblue", stroke: "black" },
    tooltips: {
      html: `<div style="width:120px;text-align:center;font-size:14px;font-weight:bold;">
            <div>李四</div>
          </div>`,
      position: { offsetX: -10, offsetY: 80 }
    }
  },
  { elementId: "Flow_0t9mkhe" },
  {
    elementId: "Activity_1x00ct7",
    colors: { fill: "pink", stroke: "black" },
    tooltips: {
      html: `<div style="width:120px;text-align:center;font-size:14px;font-weight:bold;">
            <div>王五</div>
            <div>2022-08-31 10:30</div>
            <div>意见: 退回</div>
          </div>`,
      position: { offsetX: -10, offsetY: 80 }
    }
  }
];
</script>
