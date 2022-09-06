<template>
  <component
    is="BpmnModeler"
    v-model="formData"
    v-model:xml="xml"
    v-model:modeler="modeler"
    v-model:element="element"
    :form-options="options"
    :init-options="initOption"
    prefix="flowable"
    style="height: 500px"
  ></component>
  <!-- <BpmnModeler
    v-model="formData"
    v-model:xml="xml"
    v-model:modeler="modeler"
    v-model:element="element"
    :form-options="options"
    :init-options="initOption"
    prefix="flowable"
    style="height: 500px"
  ></BpmnModeler> -->
</template>

<script setup lang="ts">
import { ref, shallowRef } from "vue";
import { defaultXml } from "avue-bpmn/defaults/xml";
import { useOptions } from "avue-bpmn/composables/options";
// import { BpmnModeler, defaultXml, useOptions } from "avue-bpmn";
// import "avue-bpmn/es/styles/bpmn-modeler.scss";

import bpmnlintConfig from "./.bpmnlintrc";

const formData = ref({});
const xml = ref(defaultXml());
const modeler = shallowRef();
const element = shallowRef();
const { options } = useOptions();
const initOption = { simulation: false, minimap: false, linting: { bpmnlint: bpmnlintConfig } };
</script>
