<template>
  <BpmnModeler
    v-model="formData"
    :form-options="options"
    :init-options="initOptions"
    prefix="flowable"
    style="height: 400px"
  ></BpmnModeler>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { BpmnModeler, processIdColumn, processNameColumn, baseColumns } from "avue-bpmn";
import "avue-bpmn/styles/bpmn-modeler.scss";

const formData = ref({});
const initOptions = { simulation: false, minimap: false };
const options = {
  "bpmn:Process": [
    {
      label: "流程配置",
      prop: "base",
      column: [processIdColumn, processNameColumn, { label: "自定义属性", prop: "custom" }]
    }
  ],
  "bpmn:StartEvent": [{ label: "节点配置", prop: "base", column: baseColumns }]
};
</script>
