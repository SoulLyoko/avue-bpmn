<template>
  <BpmnModeler
    v-model="formData"
    :xml="processData.xml"
    :form-options="formOptions"
    :init-options="initOptions"
    prefix="flowable"
    @update:modeler="modeler = $event"
    @update:element="element = $event"
    @update:xml="processData.xml = $event"
    @input="onUpdateFormData"
    @update:model-value="onUpdateFormData"
  >
    <template #bpmn-tools>
      <!-- <el-input
        type="textarea"
        :value="JSON.stringify(formData, null, 2)"
        rows="10"
        style="width: 300px; vertical-align: top"
      ></el-input> -->
    </template>
  </BpmnModeler>
  <BpmnViewer :xml="vxml" :data="viewData"></BpmnViewer>
</template>

<script lang="ts">
import type Modeler from "bpmn-js/lib/Modeler";
import type { Base } from "diagram-js/lib/model";

import { defineComponent, ref, shallowRef } from "vue-demi";

import { BpmnModeler, BpmnViewer, defaultXml, useOptions, defaultFormData } from "../packages";
import "../packages/styles/bpmn-modeler.scss";
import "../packages/styles/bpmn-viewer.scss";
import bpmnlintConfig from "./.bpmnlintrc";
import viewXml from "./viewXml";

export default defineComponent({
  name: "App",
  components: { BpmnModeler, BpmnViewer },
  setup() {
    const initOptions = {
      linting: { bpmnlint: bpmnlintConfig }
    };

    const formData = ref(defaultFormData);
    const processData = ref<any>({
      xml: defaultXml()
    });
    const modeler = shallowRef<Modeler>();
    const element = shallowRef<Base>();
    function onUpdateFormData(val: any) {
      if (element.value?.type !== "bpmn:Process") return;
      processData.value = {
        ...processData.value,
        modelKey: val.id,
        name: val.name,
        categoryId: val.category,
        icon: val.icon,
        description: val.documentation
      };
    }

    const completionCondition = "${nrOfCompletedInstances / nrOfInstances == 1}";
    const collection = "${ysMultiInstanceHandler.getList(execution)}";
    const elementVariable = "assignee";
    const allowCreateSelect = {
      type: "select",
      params: { filterable: true, allowCreate: true, defaultFirstOption: true }
    };
    const { options: formOptions, update } = useOptions();
    update({
      "assigneeColumn.value": [{ type: "custom", value: "applyUser" }],
      "completionConditionColumn.value": completionCondition,
      "collectionColumn.value": collection,
      "elementVariableColumn.value": elementVariable,
      "multiInstanceTypeColumn.value": { completionCondition, collection, elementVariable },
      "propertyColumn.value": [{ name: "name", value: "value" }],
      "propertyColumn.children.column.0": value => ({
        ...value,
        ...allowCreateSelect,
        dicData: [
          { label: "???????????????", value: "upReceive" },
          { label: "???????????????", value: "upPass" },
          { label: "???????????????", value: "editable" },
          { label: "??????????????????", value: "required" },
          { label: "????????????", value: "hidden" },
          { label: "????????????", value: "specifyJump" },
          { label: "???????????????", value: "isStart" }
        ]
      }),
      "serialColumn.value": [
        { dateFormat: "yyyyMMdd", suffixLength: "4", startSequence: "0", connector: "-", cycle: "none" }
      ],
      "timelimitColumn.value": [
        { name: "green", min: 10, max: 365 },
        { name: "yellow", min: 5, max: 10 },
        { name: "red", min: 0, max: 5 }
      ],
      "timelimitColumn.children.column.0": value => ({
        ...value,
        ...allowCreateSelect,
        dicData: [
          { label: "??????", value: "green" },
          { label: "??????", value: "yellow" },
          { label: "??????", value: "red" }
        ]
      })
    });
    setTimeout(() => {
      update({
        "buttonColumn.value": [
          {
            label: "??????",
            prop: "flow_pass",
            display: "true",
            approval: "false"
          }
        ],
        "formpropertyColumn.value": [
          {
            label: "??????",
            prop: "flow_pass",
            display: "false",
            disabled: "true",
            detail: "true",
            required: "true"
          }
        ],
        "processCategoryColumn.type": "select",
        "processCategoryColumn.dicData": [
          { label: "??????", value: "1" },
          { label: "??????", value: "2" }
        ]
      });
    }, 1000);

    const vxml = viewXml;
    const viewData = [
      { elementId: "Event_mqvUhUn", colors: { fill: "lightgreen", stroke: "black" } },
      { elementId: "Flow_wNgWBxh", colors: { stroke: "lightgreen" } },
      {
        elementId: "Activity_7xHv5cf",
        colors: { fill: "lightgreen", stroke: "black" },
        tooltips: {
          html: `<div style="width:120px;text-align:center;font-size:14px;font-weight:bold;">
            <div>??????</div>
            <div>2022-08-31 09:30</div>
            <div>??????: ??????</div>
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
            <div>??????</div>
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
            <div>??????</div>
            <div>2022-08-31 10:30</div>
            <div>??????: ??????</div>
          </div>`,
          position: { offsetX: -10, offsetY: 80 }
        }
      }
    ];

    return {
      initOptions,
      formData,
      processData,
      modeler,
      element,
      onUpdateFormData,
      formOptions,
      vxml,
      viewData
    };
  }
});
</script>

<style>
html,
body,
#app {
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>
